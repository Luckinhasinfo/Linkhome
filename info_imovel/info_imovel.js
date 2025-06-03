let botaoCalendarioOut = document.getElementById('iconCalOut');
let inputDataOut = document.getElementById('data1');
let botaoCalendario = document.getElementById('iconCalIn');
let inputData = document.getElementById('data');
botaoCalendario.addEventListener('click', function() {
        inputData.showPicker?.() || inputData.click();
    });

botaoCalendarioOut.addEventListener('click', function() {
        inputDataOut.showPicker?.() || inputDataOut.click();
    });


inputDataOut.addEventListener('change', function() {
    console.log('Data de saída alterada:', inputDataOut.value);
});
