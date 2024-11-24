
// Initial Call
 // Show the loader
 document.getElementById('canvas').style.visibility = 'hidden';
 document.getElementById('loader').style.display = 'block';
setTimeout(() => {
	printProductDetails();
	    // Hide the loader once the data is fetched
		document.getElementById('loader').style.display = 'none';
		document.getElementById('canvas').style.visibility = 'visible';
}, 2000);
	
	


		// Funtion to print the Product on Product View
		function printProductDetails(){

	const obj = JSON.parse(product);
			
			// console.log("logs for Product"+obj.product.documents.document_url);
			// console.log("logs for Product: "+obj.product.default_image?.image_url);
			document.getElementById("product-image").innerHTML ="";
			document.getElementById("product-title").innerHTML ="";
			document.getElementById("product-description").innerHTML ="";

				// console.log("status:"+inactive_status);
				// var product_page = "./product-single.html?product_id="+CurrentList[i].ID;

				document.getElementById("product-image")
				.innerHTML += "<a href='' class='photoswipe-link' data-width='1170' data-height='780'>"
				+"<img class='product_img' src='"+obj.product.default_image?.image_url+"' width='200' height='200' alt=''></a>";


				document.getElementById("product-title").innerHTML = obj.product.name;
				document.getElementById("product-description").innerHTML = obj.product?.description;

				// document.getElementById("download-button").innerHTML = "<a class='btn btn-gradient small-btn' target='_blank' href='"+obj.product.default_document?.document_url+"'>Download Catalog</a>";
				document.getElementById("product-image").innerHTML += "</br></br><a class='btn btn-gradient small-btn' style='margin-left:50px;' target='_blank' href='"+obj.product.default_document?.document_url+"'>Download Catalog</a>";
		}