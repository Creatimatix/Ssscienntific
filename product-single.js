
// Initial Call
setTimeout(() => {
	printProductDetails();
}, 2000);
	
	


		// Funtion to print the Product on Product View
		function printProductDetails(){

	const obj = JSON.parse(product);
			
			// console.log("logs for Product"+obj.product.documents.document_url);
			console.log("logs for Product: "+obj.product.default_image.image_url);
			document.getElementById("product-image").innerHTML ="";
			document.getElementById("product-title").innerHTML ="";
			document.getElementById("product-description").innerHTML ="";

				// console.log("status:"+inactive_status);
				// var product_page = "./product-single.html?product_id="+CurrentList[i].ID;

				document.getElementById("product-image")
				.innerHTML += "<a href='' class='photoswipe-link' data-width='1170' data-height='780'>"
				+"<img class='product_img' src='"+obj.product.default_image.image_url+"' width='200' height='200' alt=''></a>";


				document.getElementById("product-title").innerHTML += obj.product.name;
				document.getElementById("product-description").innerHTML += obj.product.description;



		}