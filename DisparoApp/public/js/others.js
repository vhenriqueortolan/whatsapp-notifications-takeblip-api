var new_id = 0;
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById('add');
    element.lastElementChild.remove()
}
function add() {
    new_id++;// increment reqs_id to get a unique ID for the new element
    //create col 1
    var div = document.createElement('div');
    div.setAttribute('class', 'row');
    div.setAttribute('id', 'row'+new_id);
    div.innerHTML = `<div class="col" id="col">
    <input type="text" required id="client${new_id}" name='nome' class="form-control"><br>
</div>
<div class="col" id='col0'>
    <input type="number" required size="14" id="0" name="whatsapp" class="form-control">
</div>`

    var add = document.getElementById('add')
    add.appendChild(div)
                                        
}

function uniq(){
    document.getElementById('form-uniq').style.display = 'block';
    document.getElementById('form-multi').style.display = 'none'
}

function multi(){
    document.getElementById('form-uniq').style.display = 'none';
    document.getElementById('form-multi').style.display = 'block'
}
                              