let person;

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    person = data;
    const names = document.querySelectorAll('.name');
    const companies = document.querySelectorAll('.company');
    const images = document.querySelectorAll('.slide_img');

    data.slice(0, 10).forEach((user, index) => {
      const img = images[index].querySelector('img');
      img.src = "https://i.pravatar.cc/290?img="+(index+1)
      names[index].textContent = user.name;
      companies[index].textContent = user.company.name;
    });
  })
  .catch(error => console.error(error));

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => {
  const photos = document.querySelectorAll('.slide');
  const title = document.querySelectorAll('.posts__box-item-title');
  const text = document.querySelectorAll('.posts__box-item-text');
  const post_title = document.querySelector('.posts__title-text');
  console.log(person);
  // Выделение выбранной фотографии
  photos.forEach(photo => {
    photo.addEventListener('click', () => {
      // Сбросим все цвета и полосы
      photos.forEach(p => {
        p.classList.remove('selected');
      });

      // Добавим цвет и полосу выбранной фото
      photo.classList.add('selected');

      // Получим индекс выбранной фото
      const selectedIndex = Array.from(photos).indexOf(photo);
      const selectedCompany = person.find(post => post.id === selectedIndex + 1);
      post_title.textContent = `3 актуальных поста ${selectedCompany.company.name}`;
      const filteredData = data.filter(post => post.userId === selectedIndex + 1);
      filteredData.slice(0, 3).forEach((post, index) => {
        title[index].textContent = post.title;
        text[index].textContent = post.body;
      });
    });
  });
})
.catch(error => console.error(error));