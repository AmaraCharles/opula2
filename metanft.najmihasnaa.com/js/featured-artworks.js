$(document).ready(function() {
    $('#artworksCarousel').carousel({
        interval: 3000,
        cycle: true
    });
    
    // Dynamic loading of artwork data
    function loadArtworks() {
        // This is where you would typically fetch data from your backend
        // For now, we'll use static data
        const artworks = [
            {
                image: 'images/nfts/1.jpg',
                title: 'Cosmic Dreams #1',
                artist: '@artist_cosmic',
                price: '2.5 ETH'
            },
            // Add more artwork data here
        ];
        
        // Create carousel items dynamically
        const carouselInner = $('.carousel-inner');
        for(let i = 0; i < artworks.length; i += 3) {
            const isActive = i === 0 ? 'active' : '';
            const carouselItem = $(`
                <div class="carousel-item ${isActive}">
                    <div class="row">
                        ${createArtworkCards(artworks.slice(i, i + 3))}
                    </div>
                </div>
            `);
            carouselInner.append(carouselItem);
        }
    }
    
    function createArtworkCards(artworks) {
        return artworks.map(artwork => `
            <div class="col-md-4">
                <div class="artwork-card">
                    <img src="${artwork.image}" class="img-fluid" alt="${artwork.title}">
                    <div class="artwork-info">
                        <h4>${artwork.title}</h4>
                        <p class="artist">by ${artwork.artist}</p>
                        <div class="price">${artwork.price}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    loadArtworks();
});