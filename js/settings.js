let { ipcRenderer } = require('electron');

let dateTime = localStorage.getItem('dateTime');
let sandColor = localStorage.getItem('sandColor');
let frameColor = localStorage.getItem('frameColor');
let selectedDate;

if(sandColor){
    document.getElementById('sandColor').value = sandColor;
    document.getElementById('frameColor').value = frameColor;
}//end if

let formatter = new DateFormatter();
if(dateTime){
    dateTime = formatter.parseDate(dateTime, 'm/d/Y H:i A');
    selectedDate = dateTime;
}

$.datetimepicker.setLocale('en');
$('#datetimepicker3').datetimepicker({
    //theme: 'dark',
    defaultTime: '08:00',
    value: dateTime,
    inline:true,
    format: 'm/d/Y H:i A',
    onSelectDate: updateDateTime,
    onGenerate: updateDateTime
});

function updateDateTime(date){
    let formattedDate = formatter.formatDate(date, 'm/d/Y H:i A');
    document.getElementById('dateAndTime').innerHTML = formattedDate;
    if(date >= new Date()){
        selectedDate = formattedDate;
        //localStorage.setItem('dateTime', formattedDate);//
    }else{//add one
        let futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        formattedDate = formatter.formatDate(futureDate, 'm/d/Y H:i A');
        document.getElementById('dateAndTime').innerHTML = formattedDate;
        selectedDate = formatter.parseDate(formattedDate, 'm/d/Y H:i A');
    }//end if
}//end function

$("#sandColor").spectrum({
    preferredFormat: 'hex3',
    showPaletteOnly: false,
    color: sandColor ? sandColor : '#cfcffe',
    change: function(color){
        document.getElementById('sandColor').value = color.toHexString();
     }//end function

});

$("#frameColor").spectrum({
    preferredFormat: 'hex3',
    showPaletteOnly: false,
    color: frameColor ? frameColor : 'darkorchid',
    change: function(color){
        document.getElementById('frameColor').value = color.toHexString();
     }//end function
});

//Cancel button
document.getElementById('cancel').addEventListener('click', (event) =>{
    if(!sandColor){
        localStorage.setItem('sandColor', '#cfcffe');
        localStorage.setItem('frameColor', 'darkorchid');
    }//end if
    ipcRenderer.send('close-settings');
});
//Default button
document.getElementById('default').addEventListener('click', (event) => {
    localStorage.setItem('sandColor', '#cfcffe');
    localStorage.setItem('frameColor', 'darkorchid');
    ipcRenderer.send('reload-settings');
});
//Apply button
document.getElementById('apply').addEventListener('click', (event) => {
    localStorage.setItem('dateTime', selectedDate);
    localStorage.setItem('sandColor', $("#sandColor").val());
    localStorage.setItem('frameColor', $("#frameColor").val());
    ipcRenderer.send('close-settings');
});

