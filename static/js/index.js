document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const grid_container_2 = document.querySelectorAll(".grid-container-2");
  const paragraph_and_image_one_single = document.querySelectorAll("item-type-4");
  const paragraph_and_image_two_single = document.querySelectorAll("item-type-3");
  if (items.length === 0) {
    console.warn("GSAP: no .item elements found");
    return;
  }

  gsap.fromTo(
    items,
    { opacity: 0, visibility: "hidden", y: 30 },
    {
      opacity: 1,
      visibility: "visible",
      y: 0,
      duration: 0.8,
      ease: "power1.out",
      stagger: 0.15,
      overwrite: "auto",
    }
  );
   gsap.fromTo(
    grid_container_2,
    { opacity: 0, visibility: "hidden", y: 45 },
    {
      opacity: 1,
      visibility: "visible",
      y: 0,
      duration: 0.8,
      ease: "power1.out",
      stagger: 1,
      overwrite: "auto",
    }
  );
  gsap.fromTo(
    paragraph_and_image_one_single,
    { opacity: 0, visibility: "hidden", y: 45 },
    {
      opacity: 1,
      visibility: "visible",
      y: 0,
      duration: 0.8,
      ease: "power1.out",
      stagger: 1,
      overwrite: "auto",
    }
  );
  gsap.fromTo(
    paragraph_and_image_two_single,
    { opacity: 0, visibility: "hidden", y: 45 },
    {
      opacity: 1,
      visibility: "visible",
      y: 0,
      duration: 0.8,
      ease: "power1.out",
      stagger: 1,
      overwrite: "auto",
    }
  );
  
});
