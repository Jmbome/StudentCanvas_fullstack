
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9 ;
   const endIndex = page * 9;
   let studentList=document.querySelector('.student-list');
   studentList.innerHTML="";

   for(i=0;i<list.length;i++){
      if(i>=startIndex && i<endIndex){
         const dataItem=list[i];
         const html = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src=${dataItem['picture']['large']} alt="Profile Picture">
            <h3>${dataItem['name']['first']} ${dataItem['name']['last']}</h3>
            <span class="email">${dataItem['email']}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${dataItem['registered']['date']}</span>
            </div>
         </li>`;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages=Math.ceil(list.length/9);
   const linkList=document.querySelector('.link-list');
   linkList.innerHTML="";
   for(i=1;i<=numOfPages;i++){
      if(numOfPages){
         const html = `
            <li>
               <button type="button">${i}</button>
            </li>`;
            linkList.insertAdjacentHTML('beforeend', html);
            const button=document.querySelector('button');
            button.className='active';

            linkList.addEventListener('click', (e) => {
               if (e.target.tagName == 'BUTTON') {
                  document.querySelector('.active').className="";
                  e.target.className='active';
                  showPage(list, e.target.textContent);
               }
               })
      }


   }

}



/*filter function*/

function filterList(list, value) {
   const filteredList = [];
   for (let i = 0; i < list.length; i++) {
      if (list[i]['name']['first'].toLowerCase().includes(value.toLowerCase()) || 
            list[i]['name']['last'].toLowerCase().includes(value.toLowerCase())) {
         filteredList.push(list[i]);

      } 
      
   }
   return filteredList;
}

/*search function to search through student data*/

function searchStudent(){

   const html=` <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;

 const header = document.querySelector('header');
   header.insertAdjacentHTML('beforeend', html);

   const searchBar = document.getElementById('search');
   const button = document.querySelector('button');

   // For keyup event
   searchBar.addEventListener('keyup', (e) => {
     const filteredList= filterList(data, e.target.value);
      showPage(filteredList, 1);
      addPagination(filteredList);
   });
   

    // For click event
    searchBar.nextElementSibling.addEventListener('click', (e) => {
      const filteredList = filterList(data, searchBar.value);
      showPage(filteredList, 1);
      addPagination(filteredList);

       if(filteredList==""){
         const html=`<h1 style="font-size:40px">
          Sorry no results found &#128556;
                    <h1>
                    <i style="font-size:30px">Refresh page....</i>`;

         const header = document.querySelector('header');
         header.insertAdjacentHTML('afterend', html); 
       searchBar.disabled=true;
       button.disabled=true;
   }
    
   });

}



// Call functions
showPage(data, 1);
addPagination(data);
searchStudent();

