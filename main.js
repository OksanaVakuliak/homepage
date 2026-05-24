document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".skills__tab"));
  const tags = Array.from(document.querySelectorAll(".skills__tag"));
  const factTriggers = Array.from(
    document.querySelectorAll(".fun-facts__trigger"),
  );

  if (!tabs.length || !tags.length) {
    return;
  }

  const tabToCategory = {
    All: "all",
    Frontend: "frontend",
    Backend: "backend",
    "Tools & Soft Skills": "tools",
  };

  const animationDuration = 200;
  const hideTimers = new WeakMap();

  const clearHideTimer = (tag) => {
    const timer = hideTimers.get(tag);
    if (timer) {
      window.clearTimeout(timer);
      hideTimers.delete(tag);
    }
  };

  const hideTag = (tag) => {
    clearHideTimer(tag);

    if (
      tag.classList.contains("is-hidden") ||
      tag.classList.contains("is-hiding")
    ) {
      return;
    }

    tag.classList.add("is-hiding");

    const timer = window.setTimeout(() => {
      tag.classList.add("is-hidden");
      tag.classList.remove("is-hiding");
      hideTimers.delete(tag);
    }, animationDuration);

    hideTimers.set(tag, timer);
  };

  const showTag = (tag) => {
    clearHideTimer(tag);

    if (tag.classList.contains("is-hidden")) {
      tag.classList.remove("is-hidden");
    }

    if (tag.classList.contains("is-hiding")) {
      tag.classList.remove("is-hiding");
    }

    tag.classList.add("is-showing");
    window.setTimeout(() => {
      tag.classList.remove("is-showing");
    }, animationDuration + 20);
  };

  const shouldShowTag = (tag, category) => {
    if (category === "all") {
      return true;
    }

    return tag.classList.contains(`skills__tag--${category}`);
  };

  const setActiveTab = (activeTab) => {
    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab === activeTab);
    });
  };

  const applyFilter = (category) => {
    tags.forEach((tag) => {
      if (shouldShowTag(tag, category)) {
        showTag(tag);
      } else {
        hideTag(tag);
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabLabel = tab.textContent.trim();
      const category = tabToCategory[tabLabel] || "all";

      setActiveTab(tab);
      applyFilter(category);
    });
  });

  factTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const card = trigger.closest(".fun-facts__card");

      if (!card) {
        return;
      }

      card.classList.toggle("is-open");
    });
  });
});
