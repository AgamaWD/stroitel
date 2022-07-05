if(window.getComputedStyle(document.getElementById('nav-mobile')).getPropertyValue("display") == 'block') {
    const accordeon = document.getElementById('accordeon')
    const accordeon2 = document.getElementById('accordeon2')
    menuInit()
    accordeonInit(accordeon)
    accordeonInit(accordeon2)
}

// Открыть/закрыть меню

function menuInit() {
    const menuOpenBtn = document.getElementById('menu-open')
    const menuPopup = document.getElementById('menu-popup')
    const menuCloseBtn = document.getElementById('menu-close')

    
    if(menuOpenBtn) {
        menuOpenBtn.onclick = function(e) {
            e.stopPropagation()
            menuPopup.classList.add('active')
            document.body.style.overflowY = "hidden"
        }
        menuCloseBtn.onclick = function(e) {
            e.stopPropagation()
            menuPopup.classList.remove('active')
            document.body.style.overflowY = "auto"
        }
    }
}

// Спойлеры в меню

function accordeonInit(accordeon) {
        let spoilers = accordeon.querySelectorAll(`#${accordeon.id} > .spoiler-js`);
        
        spoilers.forEach(function (spoiler) {
            spoiler.onclick = function spoilerHandler(e) {
                if((e.target.classList.contains('spoiler__title') || e.target.classList.contains('spoiler__icon')) && e.target.closest('.spoiler.nested.collapsed') !== null) {
                    e.stopPropagation()
                    deploy(e.target.closest('.spoiler.nested.collapsed'))
                    spoilers.forEach(function (spoiler2) {
                        if (spoiler2 !== spoiler && spoiler2.closest('.spoiler.nested.deployed') !== null) {
                            setTimeout(collapse, 210, spoiler2);
                        }
                    })
                } else if ((e.target.classList.contains('spoiler__title') || e.target.classList.contains('spoiler__icon')) && e.target.closest('.spoiler.nested.deployed') !== null) {
                    e.stopPropagation()
                    collapse(e.target.closest('.spoiler.nested.deployed'))
                } else if((e.target.classList.contains('spoiler__title') || e.target.classList.contains('spoiler__icon')) && e.target.closest('.spoiler.collapsed') !== null) {
                    e.stopPropagation()
                    deploy(e.target.closest('.spoiler.collapsed'))
                    spoilers.forEach(function (spoiler2) {
                        if (spoiler2 !== spoiler && spoiler2.closest('.spoiler.deployed') !== null) {
                            setTimeout(collapse, 210, spoiler2);
                        }
                    })
                } else if ((e.target.classList.contains('spoiler__title') || e.target.classList.contains('spoiler__icon')) && e.target.closest('.spoiler.deployed') !== null) {
                    e.stopPropagation()
                    collapse(e.target.closest('.spoiler.deployed'))
                }
            }
        })
    }
    
function deploy(targetSpoiler) {
    targetSpoiler.classList.remove('collapsed')
    targetSpoiler.classList.add('deployed')
}

function collapse(targetSpoiler) {
    targetSpoiler.classList.remove('deployed')
    targetSpoiler.classList.add('collapsed')
}