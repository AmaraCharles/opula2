async function fetchNFTs() {
    try {
        console.log('Starting NFT fetch...');
        const response = await $.ajax({
            type: 'GET',
            url: 'https://new-slime.onrender.com/users',
            dataType: 'json',
            timeout: 30000
        });
        console.log('API response received:', response);
        const artworks = [];
        response.data.forEach(user => {
            if (user.artWorks && user.artWorks.length > 0) {
                console.log('Processing user artWorks:', user.artWorks);
                
                user.artWorks.forEach(artwork => {
                    if (artwork.status==="listed"){
                    const nftData = {
                        title: artwork.title,
                        image: artwork.image,
                        creator: `@${user.username}`,
                        creatorAvatar: user.creatorAvatar,
                        currentBid: `${artwork.price} ETH`,
                        category: artwork.category,
                        status:artwork.status,
                        _id:artwork._id
                    };
                    console.log('Adding NFT:', nftData);
                    artworks.push(nftData);
                };
                });
            }
        });
        console.log('Total NFTs fetched:', artworks.length);
        return artworks;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return [];
    }
}


async function initShopNFTs() {
    try {
        console.log('Initializing shop NFTs...');
        const apiNFTs = await fetchNFTs();
        console.log('API NFTs:', apiNFTs);
        console.log('Local shop NFTs:', shopNFTs);
        const combinedNFTs = [...apiNFTs, ...shopNFTs];
        console.log('Total combined NFTs:', combinedNFTs.length);
        if (!combinedNFTs || combinedNFTs.length === 0) {
            console.warn('No NFTs found or failed to fetch');
            return [];
        }
        return combinedNFTs;
    } catch (error) {
        console.error('Error initializing NFTs:', error);
        return [];
    }
}

async function main() {
    try {
        console.log('Main function started');
        let shopNFTs = await initShopNFTs();
        console.log('Shop NFTs after initialization:', shopNFTs);
        if (!shopNFTs || shopNFTs.length === 0) {
            console.warn('No NFTs found or failed to fetch');
            shopNFTs = [];
        }
        return shopNFTs;
    } catch (error) {
        console.error('Error in main function:', error);
        return [];
    }
}

main();

let shopNFTs = [
    {
        title: "3D Illustration",
        image: "images/bid/1.jpg",
        creator: "@Sinanart",
        creatorAvatar: "images/avatars/2.jpg",
        currentBid: "4.07 ETH",
        category: "video",
        status:"listed"
    },
    {
        title: "Purple Leaf",
        image: "images/bid/2.jpg",
        creator: "@Yassirart",
        creatorAvatar: "images/avatars/3.jpg",
        currentBid: "1.00 ETH",
        category: "art",
        status:"listed"
    },
    {
        title: "Women Portrait",
        image: "images/bid/3.jpg",
        creator: "@studioart",
        creatorAvatar: "images/avatars/4.jpg",
        currentBid: "3.09 ETH",
        category: "art",
        status:"listed"
    },
    {
        title: "Berries Art",
        image: "images/bid/4.jpg",
        creator: "@Yomnaart",
        creatorAvatar: "images/avatars/1.jpg",
        currentBid: "2.04 ETH",
        category: "sport",
        status:"listed"
    },
    {
        title: "3D Model",
        image: "images/bid/5.jpg",
        creator: "@Yaraartist",
        creatorAvatar: "images/avatars/6.jpg",
        currentBid: "7.12 ETH",
        category: "game",
        status:"listed"
    },
    {
        title: "Colorful Leaf",
        image: "images/bid/6.jpg",
        creator: "@dreamart",
        creatorAvatar: "images/avatars/7.jpg",
        currentBid: "5.07 ETH",
        category: "music",
        status:"listed"
    },
    {
        title: "Colorful Paint",
        image: "images/bid/7.jpg",
        creator: "@Leilaart",
        creatorAvatar: "images/avatars/14.jpg",
        currentBid: "4.07 ETH",
        category: "game",
        status:"listed"
    },
    {
        title: "Multicolor Illustration",
        image: "images/bid/11.jpg",
        creator: "@Simayart",
        creatorAvatar: "images/avatars/8.jpg",
        currentBid: "2.47 ETH",
        category: "music",
        status:"listed"
    },
    {
        title: "Creative Model",
        image: "images/bid/9.jpg",
        creator: "@Sinanart",
        creatorAvatar: "images/avatars/2.jpg",
        currentBid: "4.47 ETH",
        category: "game",
        status:"listed"
    },
    {
        title: "Spiral Illustration",
        image: "images/bid/10.jpg",
        creator: "@Yassirart",
        creatorAvatar: "images/avatars/3.jpg",
        currentBid: "5.46 ETH",
        category: "game",
        status:"listed"
    },
    {
        title: "Render Art",
        image: "images/bid/13.jpg",
        creator: "@studioart",
        creatorAvatar: "images/avatars/4.jpg",
        currentBid: "2.12 ETH",
        category: "sport",
        status:"listed"
    },
    {
        title: "Digital Art",
        image: "images/bid/14.jpg",
        creator: "@Leilaart",
        creatorAvatar: "images/avatars/14.jpg",
        currentBid: "4.47 ETH",
        category: "sport",
        status:"listed"
    }
];

// Fallback data if API fails
if (shopNFTs.length === 0) {
    shopNFTs = [
        {
            title: "3D Illustration",
            image: "images/bid/1.jpg",
            creator: "@Sinanart",
            creatorAvatar: "images/avatars/2.jpg",
            currentBid: "4.07 ETH",
            category: "video"
        }
        // ... keep other fallback data here ...
    ];
}

// Initialize shop NFTs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    main();
    renderShopNFTs();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderShopNFTs() {
    console.log('Rendering shop NFTs...');
    const container = document.querySelector('.discover-nfts .row.grid');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    console.log('Shop NFTs before rendering:', shopNFTs);
    const shuffledNFTs = shuffleArray([...shopNFTs]);
    console.log('Total NFTs to render:', shuffledNFTs.length);
    container.innerHTML = shuffledNFTs.map(nft => `
        <div class="col-lg-4 col-md-6 item grid__item ${nft.category}">
            <div class="nft-box">
                <div class="nft-box-thumb">
                    <a href="#0"><img class="img-fluid" src="${nft.image}" alt></a>
                    <div class="nft-box-popularity">
                        <a href="#0"><i class="fa fa-heart-o"></i></a>
                    </div>
                    <div class="nft-box-btn-content">
                        <button class="nft-box-btn" data-nft-title="${nft.title}">Place a bid <i class="fa fa-arrow-right"></i></button>
                    </div>
                </div>
                <div class="nft-box-content">
                    <div class="nft-box-title-wrap d-flex align-items-center justify-content-between">
                        <h3 class="nft-box-title">
                            <a href="#0">${nft.title}</a>
                        </h3>
                        <div class="nft-box-trending-icon">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/></svg>
                            </span>
                        </div>
                    </div>
                    <div class="nft-box-collection d-flex align-items-center justify-content-between">
                        <div class="nft-box-user d-flex align-items-center">
                            <div class="nft-box-user-thumb">
                                <img class="img-fluid" src="${nft.creatorAvatar}" alt="">
                            </div>
                            <div class="nft-box-user-name">
                                <span>Creator</span>
                                <h4>${nft.creator}</h4>
                            </div>
                        </div>
                        <div class="nft-box-price">
                            <span>Current Bid</span>
                            <h4>${nft.currentBid}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for bid buttons
    document.querySelectorAll('.nft-box-btn').forEach(button => {
        button.addEventListener('click', () => {
            const nftTitle = button.dataset.nftTitle;
            const nft = shopNFTs.find(n => n.title === nftTitle);
            if (nft) {
                const nftCard = {
                    title: nft.title,
                    creator: nft.creator,
                    creatorAvatar: nft.creatorAvatar,
                    currentBid: nft.currentBid,
                    image: nft.image
                };
                localStorage.setItem('nftCard', JSON.stringify(nftCard));
                window.location.href = 'product-card.html';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', renderShopNFTs);