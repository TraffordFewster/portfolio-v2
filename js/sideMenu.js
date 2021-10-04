function isDescendant(parent, child) {
    var node = child.parentNode;
    if (parent === child) return true;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

document.getElementById("sideMenuToggle").onclick = function(){
    document.getElementById("sideMenu").classList.toggle("sideExpanded")
}

document.onclick = function(event) {
    if (document.getElementById("sideMenu").classList.contains("sideExpanded") && !isDescendant(document.getElementById("sideMenu"), event.target) ) {
        document.getElementById("sideMenu").classList.remove("sideExpanded")
    }
}