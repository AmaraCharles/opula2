const trendinNgNFTs = [
    {
        title: "Berries Art",
        image: "images/bid/4.jpg",
        creator: "@Yomnaart",
        creatorAvatar: "images/avatars/1.jpg",
        currentBid: "2.04 ETH"
    },
    {
        title: "3D Illustration",
        image: "images/bid/1.jpg",
        creator: "@Sinanart",
        creatorAvatar: "images/avatars/2.jpg",
        currentBid: "4.07 ETH"
    },
    {
        title: "Purple Leaf",
        image: "images/bid/2.jpg",
        creator: "@Yassirart",
        creatorAvatar: "images/avatars/3.jpg",
        currentBid: "1.00 ETH"
    }
    // Add more items if needed
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderNFTCarousel() {
    const container = document.querySelector('#artworksCarousel .carousel-inner');
    if (!container) return;

    const shuffledNFTs = shuffleArray([...trendingNFTs]);
    const chunkSize = 3;
    let carouselContent = '';

    for (let i = 0; i < shuffledNFTs.length; i += chunkSize) {
        const chunk = shuffledNFTs.slice(i, i + chunkSize);
        const isActive = i === 0 ? 'active' : '';
        carouselContent += `
            <div class="carousel-item ${isActive}">
                <div class="row">
                    ${chunk.map(nft => `
                        <div class="col-md-4">
                            <div class="artwork-card">
                                <img src="${nft.image}" class="img-fluid" alt="${nft.title}">
                                <div class="artwork-info">
                                    <h4>${nft.title}</h4>
                                    <p class="artist">by ${nft.creator}</p>
                                    <div class="price">${nft.currentBid}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = carouselContent;
}

document.addEventListener('DOMContentLoaded', renderNFTCarousel);
