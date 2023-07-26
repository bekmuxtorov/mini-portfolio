const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');
API_URL = "https://apibekmuxtorov.pythonanywhere.com"

const url = `${API_URL}/api/projects/${projectId}/`;

fetch(url)
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
        images.forEach(item => {
            var carousel_item = document.createElement('div');
            carousel_item.classList.add('carousel-item');
            if (images.indexOf(item) === 0) {
                carousel_item.classList.add('active');
            }
            carousel_item.innerHTML = `<img class="d-block w-100" src="${url + item.image}" alt="item">`;
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

        var comment_details = document.getElementById('comment_details');

        var comments = data.comments

        comments.forEach(item => {
            var comment_detail = document.createElement('div');
            comment_detail.classList.add('d-flex');
            comment_detail.classList.add('flex-start');
            comment_detail.classList.add('mb-4');

            comment_detail.innerHTML = `
                        <div class="card w-100">
                            <div class="card-body p-4">
                                <div class="">
                                    <div class='d-flex' style='align-items:center; justify-content:space-between;'>
                                        <h5>${item.full_name}</h5>
                                        <p class="small">${item.date_difference} oldin</p>
                                    </div>
                                    <p>
                                        ${item.text}
                                    </p>
                                </div>
                            </div>
                        </div>

        `
            comment_details.appendChild(comment_detail);
        });
    })
    .catch(error => {
        // Xatolarni qaytarish
        console.error('Xatolik yuz berdi:', error);
    });

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

var commentForm = document.forms.namedItem('commentForm')
commentForm.addEventListener(
    "submit",
    (event) => {
        var formData = new FormData(commentForm);
        // formData.append("CustomField", "This is some extra data");
        create_comment_url = `${API_URL}/api/comments/create/`;
        postData(create_comment_url, { full_name: formData.get('full_name'), project: projectId, text: formData.get('text') }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
        var successMessage = document.querySelector('.alert');
        successMessage.classList.add("alert-success");
        successMessage.classList.add("p-0");
        successMessage.classList.add("mt-2");
        successMessage.classList.add("text-center");

        successMessage.innerHTML = "Muaffiqiyatli saqlandi!";
        fake_comment();
        clearInput();
        event.preventDefault();
    },
    false,
);

function fake_comment() {
    var fullName = document.getElementById('fullName');
    var textArea = document.getElementById('textArea');
    var comment_detail = document.createElement('div');
    comment_detail.classList.add('d-flex');
    comment_detail.classList.add('flex-start');
    comment_detail.classList.add('mb-4');

    comment_detail.innerHTML = `
                        <div class="card w-100">
                            <div class="card-body p-4">
                                <div class="">
                                    <div class='d-flex' style='align-items:center; justify-content:space-between;'>
                                        <h5>${fullName.value}</h5>
                                        <p class="small">0 soniya oldin</p>
                                    </div>
                                    <p>
                                        ${textArea.value}
                                    </p>
                                </div>
                            </div>
                        </div>

        `
    comment_details.appendChild(comment_detail);
}

function clearInput() {
    var fullName = document.getElementById('fullName');
    var textArea = document.getElementById('textArea');
    fullName.value = '';
    textArea.value = '';
}
