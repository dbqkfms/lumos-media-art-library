import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { standardArtworks } from "@/data/standardArtworks";
import { localArtworks } from "@/data/localArtworks";
import { dedupeArtworks, loadManagedArtworks } from "@/lib/artworkData";

// Match the exact interface from standard/localArtworks
export interface Artwork {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    videoSrc?: string;
    displayType: "Horizontal" | "Vertical";
    runtime: string;
    resolution: string;
    tags?: string[];
    worldType?: "standard" | "local"; // to differentiate user uploads if needed
    artist?: string;
    format?: string;
    price?: string;
}

interface MarketplaceState {
    artworks: Artwork[];
    ownedLicenses: Artwork[];
    addArtwork: (artwork: Artwork) => void;
    acquireArtwork: (artwork: Artwork) => void;
}

// Start with all standard and local artworks preloaded
const staticArtworks: Artwork[] = [
    ...standardArtworks.map(a => ({ ...a, worldType: "standard" as const })),
    ...localArtworks.map(a => ({ ...a, worldType: "local" as const }))
];

const MarketplaceContext = createContext<MarketplaceState | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [managedArtworks, setManagedArtworks] = useState<Artwork[]>([]);
    const [artworks, setArtworks] = useState<Artwork[]>(() => dedupeArtworks(staticArtworks));
    const [ownedLicenses, setOwnedLicenses] = useState<Artwork[]>([]);

    useEffect(() => {
        let mounted = true;

        loadManagedArtworks().then((items) => {
            if (!mounted) return;
            setManagedArtworks(items);
        });

        return () => {
            mounted = false;
        };
    }, []);

    const mergedArtworks = useMemo(
        () => dedupeArtworks([...managedArtworks, ...artworks]),
        [artworks, managedArtworks],
    );

    const addArtwork = (artwork: Artwork) => {
        setManagedArtworks(prev => dedupeArtworks([artwork, ...prev]));
    };

    const acquireArtwork = (artwork: Artwork) => {
        setOwnedLicenses(prev => {
            // Prevent duplicate licensing
            if (!prev.find(item => item.id === artwork.id)) {
                return [...prev, artwork];
            }
            return prev;
        });
    };

    return (
        <MarketplaceContext.Provider value={{ artworks: mergedArtworks, ownedLicenses, addArtwork, acquireArtwork }}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export const useMarketplace = () => {
    const context = useContext(MarketplaceContext);
    if (context === undefined) {
        throw new Error("useMarketplace must be used within a MarketplaceProvider");
    }
    return context;
};
