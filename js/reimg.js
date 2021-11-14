
var link = document.createElement('a');
    link.innerHTML = 'download image';
link.addEventListener('click', function(ev) {
    link.href = c1.toDataURL();
    link.download = "mypainting.png";
}, false);
document.body.appendChild(link);