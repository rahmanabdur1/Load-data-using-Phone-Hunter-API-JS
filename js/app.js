const loadPhones = async (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
    console.log(data.data)
  };
  
  const displayPhones = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    
    const showAll =document.getElementById('show-all')
    if(dataLimit && phones.length>10){
       phones= phones.slice(0, 10);
       showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    const noPhones = document.getElementById('no-phone-message');
    if (phones.length === 0) {
      noPhones.classList.remove('d-none');
    } else {
      noPhones.classList.add('d-none');
    }
  
    phones.forEach((phone) => {
      const phoneDiv = document.createElement('div');
      phoneDiv.classList.add('col');
      phoneDiv.innerHTML = `
      <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text"></p>
      <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show All</button>
      </div>
      </div>
`;


  
      phoneContainer.appendChild(phoneDiv);
    });
  
    toggleSpinner(false);
  };
  
  const processSerach=(dataLimit)=>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
  }
  document.getElementById('btn-search').addEventListener('click', function () {
   processSerach(10)
  });
  
  document.getElementById('search-field').addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
     processSerach(10)
    }
  });
  
  const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
      loaderSection.classList.remove('d-none');
    } else {
      loaderSection.classList.add('d-none');
    }
  };

document.getElementById('btn-show-all').addEventListener('click',function(){
  processSerach()
})


const loadPhoneDetails=async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res =await fetch(url)
    const data =await res.json();
    displayPhonesDetails(data.data)
}

const displayPhonesDetails= phone=>{
    const modelTitle =document.getElementById('phoneModalLavel')
    modelTitle.innerHTML=phone.name;
    const phoneDetails=document.getElementById('phone-detail');
    phoneDetails.innerHTML=`
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no re.. found'}<p/>
    <P> Others: ${phone.others ? phone.others.Bluetooth : "No Blue..."}
    
    `
    
}
loadPhones(['apple'])