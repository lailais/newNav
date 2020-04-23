const DOMContentLoadedCB = function() {
  const ProfileTrigger = document.getElementById('ProfileTrigger')
  const MobileNavTrigger = document.getElementById('MobileNavTrigger')
  // const SiteNavigation = document.getElementById('SiteNavigation')
  const Profile = document.querySelector('.tbHeader .Profile')
  const background = document.getElementById('background')

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
  callback();
} else {
  document.addEventListener("DOMContentLoaded", DOMContentLoadedCB);
}

