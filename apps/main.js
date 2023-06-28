url = 'https://apibekmuxtorov.pythonanywhere.com'
fetch(`${url}/api/projects/`)
    .then(response => response.json())
    .then(data => {
        // Ma'lumotlarni olish uchun ishlovchi kodlar
        var projects = Array.from(data)
        console.log(data[0]);
        console.log(typeof (projects));
        var ulElement = document.querySelector('.portfolio-items')
        projects.forEach((item) => {
            var liElement = document.createElement('li');
            liElement.classList.add('portfolio-item')
            liElement.innerHTML = `
            <div class="description">
                <span class="item-span filter-item">
                ${item.direction}
                </span>
                <h3>
                ${item.name}
                </h3>
                <p>
                ${item.short_description}
                </p>
                <a class="btn-detail" href="detail.html?projectId=${item.id}">
                Batafsil ko'rish <span class="btn-icon"></span>
                </a>
            </div>
            <div class="img">
                <img src="${url}${item.images[0].image}" alt="images">
            </div>
            `;

            ulElement.appendChild(liElement)
        });
    })
    .catch(error => {
        // Xatolarni qaytarish
        console.error('Xatolik yuz berdi:', error);
    });
