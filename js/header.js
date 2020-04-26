const DOMContentLoadedCB = function() {
  const login = document.getElementById('login')
  const ProfileTrigger = document.getElementById('ProfileTrigger')
  const MobileNavTrigger = document.getElementById('MobileNavTrigger')
  // const SiteNavigation = document.getElementById('SiteNavigation')
  const Profile = document.getElementById('Profile')
  const MyOverview = document.querySelector('#Profile .MyOverview')
  const background = document.getElementById('background')

  renderMyOverview = ({member, bumpHost, childrenMapping}) => {
    const childrenInfo = getChildrenInfo(childrenMapping)
    let childrenInfoStr = ``
    childrenInfo.forEach(child => {
      childrenInfoStr += 
      `<li key=${child.id}>${child.info}</li>`
    })

    const str = `
    <div>
      <img
        src="${member.avatar_url}"
        alt="avatar"
      />
    </div>
    <div>
      <span>${member.first_name} ${member.last_name}</span>
      <ul class="ChildrenInfo">
        ${childrenInfoStr}
      </ul>
      <a href={${bumpHost}/join/profile}>Edit My Profile</a>
    </div>`
    MyOverview.innerHTML = str
  }

  renderMyStuff = ({bumpHost, childrenMapping}) => {
    const stuffChildren = getStuffChildren(childrenMapping)
    const MY_STUFF = stuffChildren.map(c => {
      switch (c.type) {
        case BIRTH_TYPE.pregnancy:
          return {
            copy: 'Pregnancy Week by Week',
            href: `${bumpHost}/pregnancy-week-by-week/${c.slug}`
          }
        case BIRTH_TYPE.baby:
          return {
            copy: 'Baby Month by Month',
            href: `${bumpHost}/baby-month-by-month/${c.slug}`
          }
        default:
          return {
            copy: 'Toddler Month by Month',
            href: `${bumpHost}/toddler-month-by-month/${c.slug}`
          }
      }
    })

    if(MY_STUFF.length > 0) {
      const MyStuffDom = document.createElement('div')
      MyStuffDom.classList.add('MyStuff')
      let StuffList = ``
      MY_STUFF.forEach(link => {
        StuffList += `
            <li key=${link.href}>
              <a href=${link.href}>
                ${link.copy}
              </a>
            </li>`
      })
      const str = `
          <h4>My Stuff</h4>
            <ul>
             ${StuffList}
            </ul>
        `
      MyStuffDom.innerHTML = str
      MyOverview.parentNode.insertBefore(MyStuffDom, MyOverview.nextSibling);
    }
  }

  renderProfile = ({member, bumpHost}) => {
    const childrenMapping = getChildrenMapping(member)
    renderMyOverview({member, bumpHost, childrenMapping})
    renderMyStuff({member, bumpHost, childrenMapping})
  }

  if(member) {
    login.style.display = 'none'
    renderProfile({member, bumpHost: config.bumpHost})
  } else {
    ProfileTrigger.style.display = 'none'
    Profile.style.display = 'none'
  }

  if (ProfileTrigger) {
    ProfileTrigger.addEventListener('click', (e) => {
      stopPropagation(e)
      const isSiteNavigationOpen = MobileNavTrigger.classList.contains('open')
      closeSiteNavigation()
  
      ProfileTrigger.classList.toggle("open")
      Profile.classList.toggle("open")
  
      if(!isSiteNavigationOpen) {
        background.classList.toggle("open")
      }
    })
  }

  if (Profile) {
    Profile.addEventListener('click', () => {
      stopPropagation()
    })
  }

  MobileNavTrigger.addEventListener('click', (e) => {
    stopPropagation(e)
    const isProfileOpen = ProfileTrigger && ProfileTrigger.classList.contains('open')
    closeProfile()
    MobileNavTrigger.classList.toggle("open")
    // SiteNavigation.classList.toggle("open")

    if(!isProfileOpen) {
      background.classList.toggle("open")
    }
  })

  document.addEventListener('click', () => {
    closeProfile()
    closeSiteNavigation()
    closeBackground()
  })

  closeProfile = () => {
    ProfileTrigger && ProfileTrigger.classList.remove("open")
    Profile && Profile.classList.remove("open")
  }

  closeSiteNavigation = () => {
    MobileNavTrigger.classList.remove("open")
    // SiteNavigation.classList.remove("open")
  }

  closeBackground = () => {
    background.classList.remove("open")
  }

  stopPropagation = (e) => {
    let ev = e || window.event
    if(ev && ev.stopPropagation) {
      ev.stopPropagation()
    } else {
      //IE
      ev.cancelBubble = true
    }
  }
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  DOMContentLoadedCB();
} else {
  document.addEventListener("DOMContentLoaded", DOMContentLoadedCB);
}

