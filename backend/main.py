from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Honda Showroom API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/showroom")
def get_showroom():
    return {
        "hero": {
            "eyebrow": "Honda Powersports",
            "title": "Red bikes. Red plates. RedBuuuud!",
            "subtitle": "Born from red dirt. Built for checkers. Discover the latest Honda sport, touring, and adventure motorcycles with real dealer support and current offers.",
            "image": "https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/sportbike-1321x1536.jpg",
            "cta": "Find a Dealer",
            "secondary": "Current Offers",
        },
        "featuredModels": [
            {
                "name": "CBR650R E-Clutch",
                "category": "Sport",
                "price": "Starting at $9,899",
                "tagline": "Street-ready performance with Honda E-Clutch technology.",
                "image": "https://powersports.honda.com/-/media/products/family/cbr650r/trims/trim-main/cbr650r-e-clutch/2025/2025-cbr650r-e-clutch-grand_prix_red-1505x923.png?imwidth=776",
            },
            {
                "name": "CBR500R",
                "category": "Sport",
                "price": "Starting at $7,399",
                "tagline": "Accessible sport styling with premium comfort and control.",
                "image": "https://powersports.honda.com/-/media/products/family/cbr500r/trims/trim-main/cbr500r/2025/2025-cbr500r-grand_prix_red-1505x923.png?imwidth=776",
            },
            {
                "name": "Gold Wing Tour",
                "category": "Touring",
                "price": "Starting at $29,500",
                "tagline": "Luxury touring with comfort, tech, and long-range confidence.",
                "image": "https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/goldwing-1321x1536.jpg",
            },
            {
                "name": "CRF450R",
                "category": "Motocross",
                "price": "Starting at $9,699",
                "tagline": "Race-proven performance for riders chasing the checkered flag.",
                "image": "https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/2027-450r/2027-450r-hph-1321x1536.jpg",
            },
        ],
        "offers": [
            {
                "title": "$700 Bonus Bucks on 2025 CBR650R E-Clutch",
                "detail": "Get added value on select sport models with Honda financing and dealer offers.",
                "image": "https://powersports.honda.com/-/media/products/family/cbr650r/trims/trim-main/cbr650r-e-clutch/2025/2025-cbr650r-e-clutch-grand_prix_red-1505x923.png?imwidth=776",
            },
            {
                "title": "$1,000 Bonus Bucks on 2025 CBR500R",
                "detail": "Limited-time offers on Honda’s reliable middleweight sport lineup.",
                "image": "https://powersports.honda.com/-/media/products/family/cbr500r/trims/trim-main/cbr500r/2025/2025-cbr500r-grand_prix_red-1505x923.png?imwidth=776",
            },
            {
                "title": "Up to $1,500 Bonus Bucks on Gold Wing",
                "detail": "Explore premium touring comfort with added savings and dealer support.",
                "image": "https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/goldwing-1321x1536.jpg",
            },
        ],
        "highlights": ["Find & Compare", "Search Inventory", "Build & Price", "Find a Dealer"],
    }


@app.get("/api/bikes")
def get_bikes():
    return get_showroom()["featuredModels"]
