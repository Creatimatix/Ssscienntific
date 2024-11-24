let currentPage = 1;
const itemsPerPage = 12;
let totalItems = 0;
var ProductsList=[];
var CurrentList=[];


// Rendering Products intially
function loadProducts(){
	
	// ------------- Product rendering Code -----------------------------
	totalItems = 0
	currentPage=1;
	document.getElementById("woocommerce-product-search-field-widget").value ="";
	ProductsList=[];
	CurrentList=[];
	  // console.log("first Print"+products);
	const obj = JSON.parse(products);
	for(i=0;i<obj.length;i++){
		
		// Check if products are available in this category
		if(obj[i].hasOwnProperty('products')){
			if(obj[i].products.length>0)
			{
				for(product=0;product<obj[i].products.length;product++){
					// console.log("Image URL : "+obj[0].image?.image_url );
					var image_url = obj[i].products[product].image?.image_url !=undefined ? obj[i].products[product].image?.image_url : "images/Dummy_Product_Image.jpg";
					var document_url = obj[i].products[product].documents?.document_url !=undefined ? obj[i].products[product].documents?.document_url : "";
					
					AddProductstoArray(obj[i].products[product].id,obj[i].products[product].name,obj[i].category_name,image_url,document_url);
					// printProduct(obj[i].products[product].name,obj[i].category_name,image_url,obj[i].document_url);
					
				}
			}
		}
				
		if(obj[i].hasOwnProperty('child_level_categories')){
			if(obj[i].child_level_categories.length>0){			
				for(j=0;j<obj[i].child_level_categories.length;j++){
					
					// Check if products are available in this category
					if(obj[i].child_level_categories[j].hasOwnProperty('products')){
						if(obj[i].child_level_categories[j].products.length>0)
						{
							for(product=0;product<obj[i].child_level_categories[j].products.length;product++){
								// console.log("Image URL : "+obj[i].child_level_categories[j].products[product].id);
								var image_url = obj[i].child_level_categories[j].products[product].image?.image_url !=null ? obj[i].child_level_categories[j].products[product].image?.image_url : "images/Dummy_Product_Image.jpg";
								var document_url = obj[i].child_level_categories[j].products[product].documents?.document_url !=null ? obj[i].child_level_categories[j].products[product].documents?.document_url : "";
								AddProductstoArray(obj[i].child_level_categories[j].products[product].id,obj[i].child_level_categories[j].products[product].name,obj[i].child_level_categories[j].category_name,image_url,document_url);
								// printProduct(obj[i].child_level_categories[j].products[product].name,obj[i].child_level_categories[j].category_name,image_url,obj[i].child_level_categories[j].document_url);
							}
						}
					}
					
				}
			}
		}
	}
	currentPage=1;
	printProducts();
}	

// Add Products to Array
function AddProductstoArray(Product_ID, Product_Name, Product_LineName, Product_Image_URL, File_URL){

	let Product_element = {
		ID : Product_ID,
		Name: Product_Name,
		LineName:Product_LineName,
		Image_URL: Product_Image_URL,
		FilePath_URL: File_URL
	};

	ProductsList.push(Product_element);
	CurrentList.push(Product_element);
}

		// Funtion to print the Product on Product View
		function printProducts(){
			renderPagination(CurrentList.length);
			const end = currentPage * itemsPerPage;
			const start = end - itemsPerPage;
			// console.log("Start: "+start +"; end: "+end+"; length:"+CurrentList.length+"; itemsPerPage: "+itemsPerPage);
			document.getElementById("products1").innerHTML ="";
			for(let i=start; i<end;i++){

				var inactive_status='';
				// if(CurrentList[i].FilePath_URL=='' || CurrentList[i].FilePath_URL==null){
				// 	inactive_status="pointer-events: none;";
				// }else{
				// 	inactive_status="";
				// }
			
				// console.log("status:"+inactive_status);
				var product_page = "./product-single.html?product_id="+CurrentList[i].ID;

				document.getElementById("products1").innerHTML += "<li class='product "+CurrentList[i].LineName+" "+CurrentList[i].Name+" item-gallery vertical-item' name='"+CurrentList[i].Name+"'>"
				+"<div class='product-inner'> <center>"
				+"<a class='woocommerce-LoopProduct-link woocommerce-loop-product__link' href='"+product_page+"'  style='"+inactive_status+"'>"
				+"<img src='"+CurrentList[i].Image_URL+"' alt='Product_Image' style='max-height:150px'>"
				+"</br></br></a>"	
				// +"<h2 class='woocommerce-loop-product__title'><center><a class='woocommerce-LoopProduct-link woocommerce-loop-product__link'  href='"+CurrentList[i].FilePath_URL+"'  style='"+inactive_status+"' target='_blank' >"+CurrentList[i].Name+"</a></center></h2>"
				+"<h2 class='woocommerce-loop-product__title'><center><a class='woocommerce-LoopProduct-link woocommerce-loop-product__link'  href='"+product_page+"'  style='"+inactive_status+"'>"+CurrentList[i].Name+"</a></center></h2>"
				+"<span class='price'>"
				+"</br><ins><span><span><a href='"+product_page+"' style='"+inactive_status+"'>View More Details</a></span></ins></span>"
				+"</br><ins><span><span><a href='"+CurrentList[i].FilePath_URL+"' style='"+inactive_status+"' target='_blank'>Download Catalog</a></span></ins></span>"
				+"</center></div>"
				+"</li>"
			}


		}

	// ------------- Product Show Code Ends Here -------------------------------
var product_list="";
function loadlist(){
const obj = JSON.parse(products);
product_list="";
// Head Category

// for each category
for(i=0;i<obj.length;i++){

  // if category have child category
  if(obj[i].child_level_categories.length>0){
	product_list += "<li><span class='caret '>" + obj[i].category_name + " ("+obj[i].child_level_categories.length+")</span>"
	  + "<ul class='nested active'>"
		
		// for each child category
		for(j=0; j<obj[i].child_level_categories.length; j++){
		  if(obj[i].child_level_categories[j].child_level_categories.length>0){
			product_list+= "<li><span class='caret'>" + obj[i].child_level_categories[j].category_name + " ("+obj[i].child_level_categories[j].child_level_categories.length+")</span>"
			+ "<ul class='nested active'>"

			// loop over each sub category
			for(k=0;k<obj[i].child_level_categories[j].child_level_categories.length;k++){
			product_list+= "<li>"+ obj[i].child_level_categories[j].child_level_categories[k].category_name + "</li>"
			}
			product_list+= "</ul></li>"    
		  }
		  else{
			product_list+= "<li><a href='javascript:void(0)' onClick=\"filterCategory('"+obj[i].child_level_categories[j].category_name +"')\">"+ obj[i].child_level_categories[j].category_name + " ("+obj[i].child_level_categories[j].products.length+")</a></li>"
		  }

		}

	product_list+= "</ul>"
	  + "</li>"                        
  }

  // if category does not have child category
  else{
	product_list+= "<li><a href='javascript:void(0)' class='item' onClick=\"filterCategory('"+obj[i].category_name +"')\">"+ obj[i].category_name + "("+obj[i].products.length+")</a></li>"
  }
  

}

document.getElementById("myUL").innerHTML = product_list;
}


// Search Items based on Search Box value
function searchProduct(){
	// console.log("triggered!"+document.getElementById("woocommerce-product-search-field-widget").value);
	let searchValue = document.getElementById("woocommerce-product-search-field-widget").value.toUpperCase();
	
	CurrentList =  ProductsList.filter(function(ProductsList) {
		return (ProductsList.Name.toUpperCase()).includes(searchValue);
	  });
	document.getElementById("products1").innerHTML ="";
	currentPage=1;
	printProducts();


}

//Script to filter the products list based on selected category item
function filterCategory(categoryValue) {
	let searchValue = categoryValue.toUpperCase();
	CurrentList =  ProductsList.filter(function(ProductsList) {
		return (ProductsList.LineName.toUpperCase()).includes(searchValue);
	});
	document.getElementById("products1").innerHTML ="";
	currentPage=1;
	printProducts();
}

function renderPagination(totalItems) {
    const pagination = document.getElementById('Pagination');
    const pagination1 = document.getElementById('Pagination1');
    pagination.innerHTML = '';
    pagination1.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

	// background-color: #dd4454;

    for (let i = 1; i <= totalPages; i++) {
        // const li = document.createElement('li');
		if(i==1){
			pagination.innerHTML +="<li class='page-list'><a class='page-number selected' >"+i+"</a></li>";
			pagination1.innerHTML +="<li class='page-list'><a class='page-number selected'>"+i+"</a></li>";
		}
		else
		{
			pagination.innerHTML +="<li class='page-list'><a class='page-number'>"+i+"</a></li>";
			pagination1.innerHTML +="<li class='page-list'><a class='page-number'>"+i+"</a></li>";
		}
		// pagination.innerHTML +="<li><a class='page-numbers current'  id='currentpage' onClick=\"OpenPage("+i+")\">"+i+"</a></li>";
		
        
    }
}



function OpenPage(PageNumber){
	currentPage=PageNumber;
	printProducts();
}


// var togglerPageNumbers = document.getElementsByClassName("page-numbers");


// for (let i = 0; i < togglerPageNumbers.length; i++) {
// togglerPageNumbers[i].addEventListener("click", function(event) {
// // console.log("clicked!"+event.target.textContent);

// OpenPage(event.target.textContent);
// // event.target.toggle("selected");
// //togglerPageNumbers[i].parentElement.querySelector("li").classList.toggle("selected");
// // this.classList.toggle("selected");	
// event.target.classList.toggle("selected");
// });
// }


var togglerPageNumbers = document.getElementsByClassName("page-numbers");

for (let i = 0; i < togglerPageNumbers.length; i++) {
    togglerPageNumbers[i].addEventListener("click", function(event) {
		event.preventDefault(); // Prevent default action of clicking anchor tag
        // console.log("clicked!" + event.target.textContent);
        // Opening the page using page number value
        OpenPage(event.target.textContent);
		updatePageNumberHighlightByValue(event.target.textContent,' selected');
		
    });
}




// Initial Call
setTimeout(() => {
loadProducts(1);
loadlist();
}, 2000);



// ---------- Carrot Functionality -------------------

var toggler = document.getElementsByClassName("caret");


for (let i = 0; i < toggler.length; i++) {
toggler[i].addEventListener("click", function() {
// console.log("clicked!");
this.parentElement.querySelector(".nested").classList.toggle("active");
this.classList.toggle("caret-down");
});
}

// ---------- End of Carrot Functionality ------------

function updatePageNumberHighlightByValue(searchValue, newClass) {
	// Get all div elements with class 'content'
	const a = document.querySelectorAll('a.page-number');

	// console.log("Search Value: "+searchValue);
	// Iterate over each div and check if its textContent matches searchValue
	a.forEach(a => {
		// console.log(a.textContent.trim());
		 a.classList.remove("selected");
	  if (a.textContent.trim() === searchValue) {
		// console.log("Match Found!");
		// Update the class of the matching div
		a.className += newClass; // Replace the class
	  }
	});
  }