const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');
url = "https://apibekmuxtorov.pythonanywhere.com"

const API_URL = `${url}/api/projects/${projectId}/`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // Ma'lumotlarni olish uchun ishlovchi kodlar
        var ulDetail = document.getElementById('ulDetail');
        var liDetail = document.createElement('li');
        liDetail.classList.add('project-overview');
        document.querySelector('.detail-sub--title').innerHTML = data.name;
        document.querySelector('.detail-title').innerHTML = data.short_description;
        document.querySelector('.date').innerHTML = data.date;
        document.querySelector('.client-name').innerHTML = data.client;
        var carousel_inner = document.querySelector('.carousel-inner')

        var images = data.images
        console.log(images);
        images.forEach(item => {
            var carousel_item = document.createElement('div');
            carousel_item.classList.add('carousel-item');
            if (images.indexOf(item) === 0) {
                carousel_item.classList.add('active');
                console.log('hello');
            }
            carousel_item.innerHTML = `<img class="d-block w-100" src="${url + item.image}" alt="item">`;
            console.log(item);
            console.log('men yangi itemman 2');
            carousel_inner.appendChild(carousel_item);
        });

        // document.getElementById('detail-image').src = url + data.images[0].image
        liDetail.innerHTML = `
        <div>
            <h4>
                Loyiha haqida
            </h4>
        </div>
        <div>
            <h5 class="overview-title">
                Dasturlash jarayoni
            </h5>

            <p>
                ${data.short_description}
            </p><br><br>

            <p>${data.full_description}</p>

            <h5 class="overview-title">
                Loyiha deploymenti:
            </h5>
            <p>
                <a href="${data.demo_url}">
                    ${data.demo_url}
                </a>
            </p>

            <h5 class="overview-title">
                Loyiha kodi:
            </h5>
            <p>
                <a href="${data.github_url}">
                    ${data.github_url}
                </a>
            </p>
        </div>
        `
        ulDetail.appendChild(liDetail)
    })
    .catch(error => {
        // Xatolarni qaytarish
        console.error('Xatolik yuz berdi:', error);
    });
