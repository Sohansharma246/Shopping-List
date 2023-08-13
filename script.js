const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearbtn= document.getElementById('clear')
const the=itemList.querySelectorAll('li')
const  itemFilter=document.getElementById('filter')
let iseditmode= false;
const formbtn=itemForm.querySelector('button')
function displayfroml()
{
    const itemsfromstorage=getitemfromstorage();
    itemsfromstorage.forEach((item)=>addItemToDom(item))
    checkup();
}
function onaddItemsubmit(e){
    e.preventDefault();
    const newitem=itemInput.value
    if(newitem === '')
    {
    alert("please add an item!!")
    return
    }
    if(iseditmode){
        const itemtoedit=itemList.querySelector('.edit-mode');
        removeitemfroml(itemtoedit.textContent);
        itemtoedit.remove();
        iseditmode=false;
    }
    else{
        if(checkdupli(newitem))
        {
            alert('That item already exists!!!');
            return
        }
    }
    // const the=itemList.querySelectorAll('li')
   addItemToDom(newitem)
   additemtol(newitem)
   itemInput.value=''
   checkup()
//    filterinput();muskan jhooti h
}
function addItemToDom(item){
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item))
    const button=createbutton();
    li.appendChild(button)
   itemList.appendChild(li)

}
function additemtol(item){
    const itemsfromstorage=getitemfromstorage();
    itemsfromstorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsfromstorage))
}
function createbutton()
{
  const button=document.createElement('button')
  button.className='remove-item btn-link text-red'
  const icon=createicon()
  button.appendChild(icon)
  return button;
}
function createicon(){
    const icon=document.createElement('i')
  icon.className='fa-solid fa-xmark'
  return icon;
}
function getitemfromstorage(){
    let itemsfromstorage;
    if(localStorage.getItem('items')===null)
    {
        itemsfromstorage=[]
    }
    else
    {
        itemsfromstorage=JSON.parse(localStorage.getItem('items'))
    }
    return itemsfromstorage
}
function onclickitem(e){
    if(e.target.parentElement.classList.contains('remove-item'))
    {
        removeItem(e.target.parentElement.parentElement)
    }
    else
    {
        setitemtoedit(e.target)
    }
}
function checkdupli(item){
    const itemsfromstorage=getitemfromstorage()
    return itemsfromstorage.includes(item)
}
function setitemtoedit(item){
iseditmode=true
itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'))
item.classList.add('edit-mode');
formbtn.innerHTML='<i class="fa-solid fa-pen"></i>Update Item';
formbtn.style.backgroundColor='#22BB22';
itemInput.value=item.textContent
}
function removeItem(item){
   
        if(confirm('Are you sure for remove the item!!')){
      item.remove();
      removeitemfroml(item.textContent)
    checkup()
        }
    
}
function removeitemfroml(item){
let itemsfromstorage = getitemfromstorage()
itemsfromstorage= itemsfromstorage.filter((i) => i !== item)
localStorage.setItem('items',JSON.stringify(itemsfromstorage))
}
function  clearall(){
    // const ul=document.querySelector('ul')
    // ul.innerHTML=''
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    localStorage.removeItem('items');
    checkup()

}

function checkup(){
    const the=itemList.querySelectorAll('li')
    //  console.log(the)
    if(the.length===0){
        clearbtn.style.display='none'
        itemFilter.style.display='none'
    }
else{
    clearbtn.style.display='block'
    itemFilter.style.display='block'  
}
formbtn.innerHTML='<i class="fa-solid fa-plus"></li>Add Item'
formbtn.style.backgroundColor='#333'
iseditmode=false
}

function filterinput(e)
{   
    // e.preventDefault()
    const the=itemList.querySelectorAll('li')
    console.log(the)
    const text=e.target.value.toLowerCase()
    the.forEach((item)=>{
    const name=item.firstChild.textContent.toLowerCase()
 
        if(name.indexOf(text)!= -1)
        {
        item.style.display='flex';
        }
        else{
            item.style.display='none'
        }
        
})
}
function init()
{ 
itemForm.addEventListener('submit',onaddItemsubmit)
itemList.addEventListener('click',onclickitem)
clearbtn.addEventListener('click',clearall)
// filterinput()
itemFilter.addEventListener('input',filterinput);
document.addEventListener('DOMContentLoaded',displayfroml);
checkup()
}
init();
