var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);

var myBtn = document.getElementById('showSideBar');

myBtn.addEventListener('click', function(event) {
	sidebar.show();
});