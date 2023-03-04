
var requestMarketList = new XMLHttpRequest();
var htmlMarketList = '';

function marketList(action) {
    document.getElementById('marketListingPage').style.display = 'block';
    document.getElementById('logListingPage').style.display = 'none';
    requestList(action);
}


function requestList(action) {
    var url;
    var body = null;
    if(action == "" || action == null){
        url = path + "/atwd/index.php/market";
        body = null;
    }
    if(action == 'clear'){
        url = path + "/atwd/index.php/market";
        document.getElementById('search_name').value = '';
        document.getElementById('search_region').value = '';
        document.getElementById('search_district').value = '';
        clearSearch();
        body = null;
    }
    if(action == 'left'){
        var lang = '-';
        var search_name = document.getElementById('search_name').value;
        search_name = search_name == '' ? '-' : search_name;
        var search_region = document.getElementById('search_region').value;
        search_region = search_region == '' ? '-' : search_region;
        var search_district = document.getElementById('search_district').value;
        search_district = search_district == '' ? '-' : search_district;
        // var search_address = document.getElementById('search_address').value;
        // var search_bh = document.getElementById('search_bh').value;
        var checkedValue = document.querySelectorAll('#checkBoxTC:checked');
        // var tcArray = [];
        var tcStr;
        if(checkedValue.length == 0){
            tcStr = '-';
            // console.log(tcStr);
        } else {
            tcStr = checkedValue[0].value;
            for (var i = 1; i < checkedValue.length; i++) {
                // console.log(checkedValue[i].value);
                // tcArray.push(checkedValue[i].value);
                tcStr += ',' + checkedValue[i].value;
            }
        }

        url = path + "/atwd/index.php/market/search/"+lang+'/'+search_name+'/'+search_region+'/'+search_district+'/'+tcStr;
        
        // console.log('url ' + url);
        //   var json = {
        //     Market_Name: search_name,
        //     Region: search_region,
        //     District: search_district,
        //     // Address: search_address,
        //     // Business_Hour: search_bh,
        //     tc: tcArray};
        //   console.log(JSON.stringify(json));
        // body = JSON.stringify(json);
        body = null;
    }
    // console.log(action);
    // console.log(url);
    requestMarketList.open("GET", url, true);
    requestMarketList.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    requestMarketList.onreadystatechange = updatePage;
    
    requestMarketList.send(body);
    // document.getElementsByClassName("pagetitle-h1")[0].innerHTML = "Market";
    // document.getElementById("pagetitle-h1").innerHTML = "Market";
    // document.getElementsByClassName("breadcrumb-item active")[0].innerHTML = "Listing";
}
  
// function replaceSlash(str){
//     return replace()
// }

function updatePage() {   // callback
    if (requestMarketList.readyState == 4) {
        if (requestMarketList.status == 200) {
            var serverData = requestMarketList.responseText;
            // displayArea.innerHTML = serverData;
            var resultArray = JSON.parse(serverData);
            htmlMarketList = '<table class="table table-striped">';
            htmlMarketList += '<thead><tr><th scope="col">ID</th>';
            htmlMarketList += '<th scope="col">Name</th>';
            htmlMarketList += '<th scope="col">Region</th>';
            htmlMarketList += '<th scope="col">District</th>';
            htmlMarketList += '<th scope="col">Address</th>';
            htmlMarketList += '<th scope="col"></th>';
            htmlMarketList += '<th scope="col"></th>';
            // htmlMarketList += '<th scope="col"></th>';
            htmlMarketList += '</thead><tbody>';
            if(resultArray['Code'] == 200){
                for(var i=0; i< resultArray['Data'].length; i++){
                    htmlMarketList += '<tr>';
                    htmlMarketList += '<th scope="row">'+resultArray['Data'][i]['Market_ID']+'</th>';
                    htmlMarketList += '<td>'+resultArray['Data'][i]['Market_Name']+'</td>';
                    htmlMarketList += '<td>'+resultArray['Data'][i]['Region']+'</td>';
                    htmlMarketList += '<td>'+resultArray['Data'][i]['District']+'</td>';
                    htmlMarketList += '<td>'+resultArray['Data'][i]['Address']+'</td>';
                    // htmlMarketList += '<td>';
                    // for(tc of resultArray['Data'][i]['Tenancy_Commodity']){
                    //     htmlMarketList += tc['Tenancy_Commodity_e'] + '; ';
                    // }
                    // htmlMarketList += '</td>';
                    // htmlMarketList += '<td>'+resultArray['Data'][i]['Bussiness_Hour']+'</td>';
                    htmlMarketList += '<td><a href="" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="javascript:setConfirmDeleteModal('+"'edit'"+','+"'"+resultArray['Data'][i]['Market_ID']+"'"+');"><i class="bi bi-pencil-fill"></i></a></td>';
                    htmlMarketList += '<td><a href="" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="javascript:setConfirmDeleteModal('+"'detail'"+','+"'"+resultArray['Data'][i]['Market_ID']+"'"+')"><i class="bi bi-eye"></i></a></td>';
                    // htmlMarketList += '<td><a href="" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="javascript:setConfirmDeleteModal('+"'delete'"+','+"'"+resultArray['Data'][i]['Market_ID']+"'"+')"><i class="bi bi-trash" ></i></a></td>';
                    htmlMarketList += '</tr>';
                }
                htmlMarketList += '</tbody></table>';
                // displayArea.innerHTML = htmlMarketList;
                document.getElementById("table1").innerHTML = htmlMarketList;
            } else {
                alert('Error: '+resultArray['Message']);
            }
        }
    }
}
