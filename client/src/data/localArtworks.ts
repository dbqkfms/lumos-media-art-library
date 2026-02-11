/**
 * LOCAL 작품 데이터
 * 한국 전통 소재를 디지털 미디어아트로 표현한 상업용 콘텐츠
 */

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  displayType: "Horizontal" | "Vertical";
  runtime: string;
  resolution: string;
}

export const localArtworks: Artwork[] = [
  {
    id: "local-crane",
    title: "학의 비상",
    description: "분홍빛 하늘을 가로지르는 우아한 학의 실루엣. 한국 전통 구름 문양과 함께 평화로운 분위기를 연출하는 미디어아트입니다. 카페, 호텔 로비, 웰니스 센터에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/niPQwavTkd7ybijPcoH9Yh-img-1_1770848535000_na1fn_bG9jYWxfYXJ0X2NyYW5l.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L25pUFF3YXZUa2Q3eWJpalBjb0g5WWgtaW1nLTFfMTc3MDg0ODUzNTAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMk55WVc1bC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sWy-2OxE91NYU2ezNmyk5haFwG4tA5hCA01y6QWMRhLW099BMCYDYtMOjof19Qx4db4gBrSJt~CpjOARzSaYjVlDm4xhkhvioOFGO0-dmAAuOzMTPU-SgU6fwXAOBiX2PGh-LMLxQ6BUu4Cmw0PNpW8yCtqHb4akuHd0vWL0Hhqv1CTnlySSQvQhl57ZP3KAW7DtjgB0BaJe5VWNbeDEg0e5qcMdV~vrXEdhKEYtm~XfkVwe~0z0eGUPBb80AZ-~5NGloUFaRd7HKSannJGDUjrgpYznnmEq5MOeRvD4eUKZk-MAFBv9QrwaHSe~Jim~611k~WArbgsAKAfHQJMTKg__",
    displayType: "Horizontal",
    runtime: "60 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-kite",
    title: "전통 연날리기",
    description: "밝은 하늘을 수놓는 형형색색의 전통 연. 기하학적 패턴과 선명한 색상으로 활기찬 분위기를 만드는 미디어아트입니다. 어린이 공간, 문화센터, 상업 시설에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/niPQwavTkd7ybijPcoH9Yh-img-2_1770848532000_na1fn_bG9jYWxfYXJ0X2tpdGU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L25pUFF3YXZUa2Q3eWJpalBjb0g5WWgtaW1nLTJfMTc3MDg0ODUzMjAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMnRwZEdVLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TeKv2ZGuLsw0F4w0AxnzwUQrqguTysAUzdD4ov8zcDIUWY2psxLdRvv98wiZbFuwLEfa3kssTT8JD5hDWCgNOqCjH18uLuM6E2iNtzsle0dkT2XAzMkePj~Nzi6K9Zfv~WeVvwKpC~OiioqbpYasF~LJG4GP9uddjbjsCHbEXtcn3WXIrw0UXBy~Z9UX1GYvbiBMffZr4K0~TNZ7jtjCLb~CYDEDzieP73V2E5iz-GfqyAsCKUaCAsY7HXOSltWNTb9Hh1a~uzl0w5mYYvzq4aHv8zJu1lnk3cNbg5tfzomud89RTWXt6JvFLeNjiLsB1~DHa9OgzYUHXuQGk~C2ew__",
    displayType: "Horizontal",
    runtime: "45 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-plum",
    title: "매화의 향기",
    description: "은은한 분홍빛 그라데이션 위로 피어나는 섬세한 매화. 우아한 붓터치 스타일로 고요하고 세련된 분위기를 연출합니다. 한식당, 전통 찻집, 스파에 적합합니다.",
    category: "Seasonal",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/niPQwavTkd7ybijPcoH9Yh-img-3_1770848543000_na1fn_bG9jYWxfYXJ0X3BsdW0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L25pUFF3YXZUa2Q3eWJpalBjb0g5WWgtaW1nLTNfMTc3MDg0ODU0MzAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYM0JzZFcwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MHwPHNmCUhnuWLx2j9HbC68zncvybMSfTqIZUdfIgM8GXHB5pGZNJbdBMJBvaGWO4pOKVX4R8FGF7A~A8goSL0egu0FRbV6bO0gS5aaDh5zZZhQuwwmaa0g~NALLR9hL7yBxNiyCFlF4mhY4grZOkwuLj38eU8g9sfE6QKP6QnU7vg8XAKJK9XFk-HDV9Yd0AjnX1ZVkIk0PoALlMtnJpDfbBLKmsVrJe9GP7H9qTan63XDH6bRtYEB6JebAWA~Odpo7qUlskVSLCwIDfDgP7OfQKtUJV~BdfTO-lsFKBu89YQ5iK0v4DuxtGQqEFWgWx1~mi0M793RFwNyYLABqMQ__",
    displayType: "Horizontal",
    runtime: "90 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-dancheong",
    title: "단청의 흐름",
    description: "전통 단청 문양을 현대적으로 재해석한 추상 미디어아트. 빨강, 파랑, 초록, 노랑의 선명한 색상과 빛나는 테두리로 역동적인 에너지를 표현합니다. 문화 시설, 공공 공간에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/niPQwavTkd7ybijPcoH9Yh-img-4_1770848528000_na1fn_bG9jYWxfYXJ0X2RhbmNoZW9uZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L25pUFF3YXZUa2Q3eWJpalBjb0g5WWgtaW1nLTRfMTc3MDg0ODUyODAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMlJoYm1Ob1pXOXVady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BWEStyWkcKAKCEWX6luA-bC4igeoOVTZO~811YOnIR6jiAsMtFFzRD4zNMxNtnkBtD~cOBRvS9Ai8wl6qIpiBbQhTKixGhHQBbDZpnLcp7RrEBtq-XaKICqcAkvHxdE6uQFBp6uLx5-O4bYugnobRteJeMBAPn4VMwY2IthvakcKfgktVNch7XkH4EUmYdQwNv1bAzmbRFUajlYP4fIExL5rAqysdauaRIKBoi~JzEaqg-SAoWsHT4gf2K7SeQ53zFLu5H~pENLatqz1Kwn1YYZO5ZjdE40olNHKBvYZO17iwvvqZb8gYDqlA8BiR9KpUAWceXVZCdvwL39pNrdU3A__",
    displayType: "Horizontal",
    runtime: "120 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-fan",
    title: "부채의 우아함",
    description: "섬세한 꽃 문양이 그려진 전통 부채. 부드러운 파스텔 톤(복숭아, 민트, 라벤더)과 은은한 빛 효과로 세련되고 고급스러운 분위기를 연출합니다. 부티크, 갤러리, 호텔 객실에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/niPQwavTkd7ybijPcoH9Yh-img-5_1770848531000_na1fn_bG9jYWxfYXJ0X2Zhbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L25pUFF3YXZUa2Q3eWJpalBjb0g5WWgtaW1nLTVfMTc3MDg0ODUzMTAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMlpoYmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OfqwTQc7FQYB8ESkBwA-jYryNEZeCZ5V57yhjRXEUC-Ahj18mPBJihLtbblt6YCoCTH5njjnPJGtoLcTD5lAyJzPycY8rENZMLymm31TA82kgr4rynjCFeCBZkoymrvhktkcjsmI64~PwYPRzjxNps5lcS37YUowxkuEwxnu4Z3f-1RGXnSp0mVD5loGxKXB5FzjT0tg8H4KucPjllp8HpYraMnlfaC4T5Bue6Oo2rIf8XlJLq3mJz2hhm7Qxjsp6r1Kqws87QdmgZeCydcFVLwjjjwq7srf8FOYi6P2qkEEYmxpQQVnzrDCdDCjkecCxwSmgehbEO6L4porV-Of7Q__",
    displayType: "Horizontal",
    runtime: "75 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-hanbok",
    title: "한복의 선율",
    description: "우아하게 흐르는 한복 실루엣. 라벤더, 복숭아, 민트 파스텔 그라데이션으로 표현된 현대적 미니멀 디지털 아트입니다. 패션 매장, 문화 공간, 이벤트 홀에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/V2yV3OLI15hCHRCueCxfip-img-1_1770848602000_na1fn_bG9jYWxfYXJ0X2hhbmJvaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L1YyeVYzT0xJMTVoQ0hSQ3VlQ3hmaXAtaW1nLTFfMTc3MDg0ODYwMjAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMmhoYm1KdmF3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F-bIQ2gal3IeXU8OsGJ7nk1ulP~9UZrMmWc7dxTStEpiP7h3GDW6sD78zltKJGZ0AQWegcoigSy773Af4Q3X3OvsCM8ck7fWp97ys2eM6nMbi4IBaFHxt~SGB~l8EOghtCbcXxQ0h7woaswEE-mfc2EgeFZ82cAAjaQN2VG3uKiSuEbeITd0Mka726Fa~0RGqWHC19W7Vk6WLoWf5pCxp3JmYNdI2wF6wytjWH8jOt8rMBgS5IIhp1PkWIFeYGo-yO3Cro2gt7YYli4HwNGNKbE~jojRr6sTJMfD~hja2AaG~geE13od20gG~oGdTwx~aNs7fi3v-GNuODOrW7Ixqw__",
    displayType: "Horizontal",
    runtime: "60 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-lotus",
    title: "연꽃의 고요",
    description: "고요한 연못에 피어난 연꽃. 은은한 물결 효과와 부드러운 빛 반사로 평화로운 분위기를 연출하는 미디어아트입니다. 명상 센터, 요가 스튜디오, 웰니스 공간에 적합합니다.",
    category: "Nature",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/V2yV3OLI15hCHRCueCxfip-img-2_1770848602000_na1fn_bG9jYWxfYXJ0X2xvdHVz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L1YyeVYzT0xJMTVoQ0hSQ3VlQ3hmaXAtaW1nLTJfMTc3MDg0ODYwMjAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMnh2ZEhWei5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GvR3Y99Hmgxja0yhN36H0kTDWLhPsrrvqt3nuTdU~ZBnmscCVIBTxXRf-op-JgjCTa-nLfmF2f~~kxRJERLYax~MIdPbIoljWL-dz87qZno5y~C5qHulc0dj1P6SZZxIaNatHEIJCIF7jXMo3IRQj1Yw58CHUc414wCyobZvEtn3yDarL3oaXliS78PmOOm8xvrNvZUbm-VmgmC9kVWzM8pdqEKNUsC5UPJI-m4rkUBEMFQO-1XRoupGDFYDes2hN7Gm2gIREJqdVIJecLRdtcNOcNAAWGva0oeyoie4rJ-DvIjuNwhtVfzUpRzPlKwIMQi5jWPKPbdop8AfFC4ElA__",
    displayType: "Horizontal",
    runtime: "90 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-bamboo",
    title: "대나무 숲",
    description: "부드러운 초록 그라데이션으로 표현된 대나무 숲. 수직선의 미니멀한 구성과 은은한 빛 효과로 고요하고 선적인 분위기를 연출합니다. 한식당, 선 센터, 티 하우스에 적합합니다.",
    category: "Nature",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/V2yV3OLI15hCHRCueCxfip-img-3_1770848601000_na1fn_bG9jYWxfYXJ0X2JhbWJvbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L1YyeVYzT0xJMTVoQ0hSQ3VlQ3hmaXAtaW1nLTNfMTc3MDg0ODYwMTAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMkpoYldKdmJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=EeKLTSn1l38gMS10PA51qT~PYnYISwR8ac5ugjv4xD8ebYakGYEkofsr2NKoIWzS92A1LMF6Ru3sePZRJWRxnpEKpAE9J2R6Xa01TpJjd5WGnJZUZw9FkGGrPOYXn5Kg8lu1Rl1eU9to9cbgwevlzIorAtNBb7cvpBSkx8Hn1d2XcLZjZjFBUvWIOlSCSRPY80hwDnk~O9DalsAfAmeGs~orYd6fXyoFcdeccZo3IOuzS1zzyjwofUeJgTemAxtlcpQno64I~m8A4HWsPPoqthiy8hoP6iSdq3gD5cLHLVNqKgKfmVGFTupjkGf7z9SjeuCZvqS88G5sjjh5gjMwUg__",
    displayType: "Horizontal",
    runtime: "120 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
  {
    id: "local-moon",
    title: "보름달과 정자",
    description: "은은한 보름달과 한국 전통 정자의 실루엣. 부드러운 파란색과 은색 톤으로 몽환적이고 평화로운 분위기를 연출하는 미디어아트입니다. 한옥 스테이, 전통 문화 공간에 적합합니다.",
    category: "Traditional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/V2yV3OLI15hCHRCueCxfip-img-4_1770848621000_na1fn_bG9jYWxfYXJ0X21vb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L1YyeVYzT0xJMTVoQ0hSQ3VlQ3hmaXAtaW1nLTRfMTc3MDg0ODYyMTAwMF9uYTFmbl9iRzlqWVd4ZllYSjBYMjF2YjI0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qXe-UR5rYrM8T4zunwn4PuaglJGPtbybJnyYjNeztc3jqnKgllYr-Lq74NP8FeNFJZ9Z8nbDF4lMxd0j1jP8Sw4xT4EfP2671iuDNeZHVZYpzg4K9afMwb~YaItHiw~tkYT4eC9YIL~PsNMrFoSKJ04bYFlqGhk2mnOXqJe5o6dVC27Pf5GTpD21orKkQvfc61nXI~8ru6xMEuhomV3gav~YTF9mXLZHJGs-O3qF3~v3kJ5gdy01U7w2BKXB0nJ4~S8JHMQecs~Q7eDm~1UNRbUCx7qOAvONmcR4v6NgCtHoAaeiH1B8MRJCmQF81AciCqTdfdc3zo73ZXQruRuovQ__",
    displayType: "Horizontal",
    runtime: "75 seconds loop",
    resolution: "3840x2160 (4K UHD)",
  },
];

export const localCategories = ["All", "Traditional", "Nature", "Seasonal"];
