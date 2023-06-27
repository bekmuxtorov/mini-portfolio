const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

const API_URL = `https://apibekmuxtorov.pythonanywhere.com/api/projects/${projectId}/`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // Ma'lumotlarni olish uchun ishlovchi kodlar
        var ulDetail = document.getElementById('ulDetail');
        var liDetail = document.createElement('li');
        console.log(data);
        liDetail.classList.add('project-overview');
        document.querySelector('.detail-sub--title').innerHTML = data.name;
        document.querySelector('.detail-title').innerHTML = data.short_description;
        document.querySelector('.date').innerHTML = data.date;
        document.querySelector('.client-name').innerHTML = data.client;
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
