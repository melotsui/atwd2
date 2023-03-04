
var requestPageLoad = new XMLHttpRequest();
var htmlPageLoad = '';
var tcList = [];
var regionList = [];
var districtList = [];
var allDistrictList = [];

function pageLoad(){
    document.getElementById('marketListingPage').style.display = 'block';
    document.getElementById('logListingPage').style.display = 'none';
    loadSearchFields();
}


function loadSearchFields(){
    var url = path + '/atwd/index.php/market/field';
    
console.log(url);
    var body = null;
    requestPageLoad.open("GET", url, true);
    // console.log('loadSearchFields');
    // console.log(url);
    requestPageLoad.onreadystatechange = requestSearchBar;
    requestPageLoad.send(body);
}

function requestSearchBar(){
    if (requestPageLoad.readyState == 4) {
        if (requestPageLoad.status == 200) {
            var serverData = requestPageLoad.responseText;
            var resultArray = JSON.parse(serverData);
            if(resultArray['Data'] != null){
                regionList = resultArray['Data']['region'];
                htmlPageLoad = '<option value="" selected></option>';
                for(region of resultArray['Data']['region']){
                    htmlPageLoad += '<option value="'+region['region_e']+'">'+region['region_e']+'</option>'
                }
                document.getElementById("search_region").innerHTML = htmlPageLoad;
                allDistrictList = resultArray['Data']['district'];
                htmlPageLoad = '<option value="" selected></option>';
                for(region of resultArray['Data']['district']){
                    htmlPageLoad += '<option value="'+region['District_e']+'">'+region['District_e']+'</option>'
                }
                document.getElementById("search_district").innerHTML = htmlPageLoad;
            // htmlPageLoad = '<option value="" selected></option>';
            // for(region of resultArray['Data']['businessHour']){
            //     htmlPageLoad += '<option value="'+region['Business_Hour_e']+'">'+region['Business_Hour_e']+'</option>'
            // }
            // document.getElementById("search_bh").innerHTML = htmlPageLoad;
                tcList = resultArray['Data']['tc'];
                htmlPageLoad = '';
                for(tc of resultArray['Data']['tc']){
                    htmlPageLoad += '<div class="form-check">';
                    htmlPageLoad += '<input class="form-check-input tc" type="checkbox" id="checkBoxTC" value="'+tc['Tenancy_Commodity_e']+'">';
                    htmlPageLoad += '<label class="form-check-label" for="checkBoxTC">';
                    htmlPageLoad += tc['Tenancy_Commodity_e'];
                    htmlPageLoad += '</label>';
                    htmlPageLoad += '</div>';
                }
                document.getElementById("search_tc").innerHTML = htmlPageLoad;
            } else {
                alert('Error: '+resultArray['Message']);
            }
        }
    }
}

function loadDistrictFields(){
    document.getElementById("search_district").value = '-';
    // console.log(document.getElementById('search_region').Value);
    var url = path + '/atwd/index.php/market/field/district/' + document.getElementById('search_region').value;
    var body = null;
    requestPageLoad.open("GET", url, true);
    // console.log('loadDistrictFields');
    // console.log(url);
    requestPageLoad.onreadystatechange = requestDistrictFields;
    requestPageLoad.send(body);
}

function requestDistrictFields(){
    if (requestPageLoad.readyState == 4) {
        if (requestPageLoad.status == 200) {
            var serverData = requestPageLoad.responseText;
            var resultArray = JSON.parse(serverData);
            // console.log(serverData);
            if(resultArray['Code'] == 200){
                htmlPageLoad = '<option value="" selected></option>';
                for(district of resultArray['Data']['district']){
                    htmlPageLoad += '<option value="'+district['District_e']+'">'+district['District_e']+'</option>'
                }
                document.getElementById("search_district").innerHTML = htmlPageLoad;
            } else {
                alert('Error: '+resultArray['Message']);
            }
        } 
    }
}


