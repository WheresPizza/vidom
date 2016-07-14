function append(parent, child) {
    if(Array.isArray(parent)) {
        insertBefore(child, parent[1]);
    }
    else if(Array.isArray(child)) {
        let currentChild = child[0],
            nextChild;
        const lastChild = child[1];

        while(currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.appendChild(currentChild);
            currentChild = nextChild;
        }

        parent.appendChild(lastChild);
    }
    else {
        parent.appendChild(child);
    }
}

function remove(child) {
    if(Array.isArray(child)) {
        let currentChild = child[0],
            nextChild;
        const lastChild = child[1],
            parent = lastChild.parentNode;

        while(currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.removeChild(currentChild);
            currentChild = nextChild;
        }

        parent.removeChild(lastChild);
    }
    else {
        child.parentNode.removeChild(child);
    }
}

function insertBefore(child, beforeChild) {
    Array.isArray(beforeChild) && (beforeChild = beforeChild[0]);

    if(Array.isArray(child)) {
        let currentChild = child[0],
            nextChild;
        const lastChild = child[1],
            parent = lastChild.parentNode;

        while(currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.insertBefore(currentChild, beforeChild);
            currentChild = nextChild;
        }

        parent.insertBefore(lastChild, beforeChild);
    }
    else {
        beforeChild.parentNode.insertBefore(child, beforeChild);
    }
}

function move(child, toChild, after) {
    if(after) {
        Array.isArray(toChild) && (toChild = toChild[1]);
        const nextSibling = toChild.nextSibling;

        nextSibling?
            insertBefore(child, nextSibling) :
            append(toChild.parentNode, child);
    }
    else {
        insertBefore(child, toChild);
    }
}

function replace(old, replacement) {
    if(Array.isArray(old)) {
        insertBefore(replacement, old);
        remove(old);
    }
    else {
        old.parentNode.replaceChild(replacement, old);
    }
}

function removeChildren(from) {
    if(Array.isArray(from)) {
        let currentChild = from[0].nextSibling,
            nextChild;
        const lastChild = from[1],
            parent = lastChild.parentNode;

        while(currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.removeChild(currentChild);
            currentChild = nextChild;
        }
    }
    else {
        from.textContent = '';
    }
}

export default {
    append,
    remove,
    insertBefore,
    move,
    replace,
    removeChildren
}
