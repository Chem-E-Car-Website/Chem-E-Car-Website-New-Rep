
/* ============================================================
   McGILL CHEM-E CAR WEBSITE
   JAVASCRIPT: script.js
   ============================================================

   What this file does:
   This file controls the website's interactive features.

   Rly important features
   1. Expand and collapse content folders.
   2. Open and close images in a full-screen overlay.
   3. Animate numerical statistics when scrolling.
   4. Switch between photo gallery tabs.
   5. Expand and collapse FAQ answers.

   How it works:
   JavaScript interacts with HTML elements using the
   Document Object Model (DOM).

   Functions can:
   - Find elements using their class names or IDs.
   - Change an element's CSS styling.
   - Add or remove CSS classes.
   - Respond to user actions such as clicks and scrolling.

   IMPORTANT:
   Some functions in this file are called directly by
   HTML elements, while others use event listeners.

   Keep the corresponding HTML IDs and class names
   consistent with the selectors used here.

   ============================================================ */


/* ============================================================
   1. EXPAND AND COLLAPSE CONTENT FOLDERS
   ============================================================

   PURPOSE:
   Show or hide content when a visitor clicks a folder.

   The function locates the HTML element immediately
   following the clicked folder and toggles its display.

   The related CSS defines the appearance of the
   .folder and .content elements.
*/


/**
 * Toggles the visibility of a folder's associated content.
 *
 * The function finds the element immediately following the
 * clicked element and checks its inline display property.
 *
 * If its display is currently "flex", it becomes "none".
 * Otherwise, it becomes "flex".
 *
 * This allows a visitor to expand or collapse content
 * without navigating to another page.
 *
 * @param {HTMLElement} el - The clicked folder element.
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example HTML:
 * // <div class="folder" onclick="toggle(this)">Team</div>
 * // <div class="content">...</div>
 *
 * // Clicking the folder shows or hides the content.
 *
 * IMPORTANT:
 * The content must be the folder's next element sibling.
 * If no next element exists, the function will throw an error.
 *
 * The function checks the inline display style, not the
 * computed CSS display value.
 */
function toggle(el){

    // Find the HTML element immediately after the clicked folder.
    const next = el.nextElementSibling;

    // Toggle the content between visible (flex) and hidden (none).
    next.style.display = next.style.display === "flex" ? "none" : "flex";

}


/* ============================================================
   2. IMAGE OVERLAY / LIGHTBOX
   ============================================================

   PURPOSE:
   Allow visitors to view an image at a larger size.

   When a visitor clicks an image card:
   - The selected image's URL is retrieved.
   - The enlarged image receives that URL.
   - The full-screen overlay becomes visible.

   The overlay's appearance is controlled by the
   #overlay and #overlay img CSS selectors.

   HTML DEPENDENCIES:
   #overlay
      The full-screen overlay container.

   #big
      The image element displayed inside the overlay.
*/


/**
 * Opens the image overlay using the image inside a card.
 *
 * The function searches the supplied card element for
 * its first <img> element.
 *
 * It copies the image's source URL into the image with
 * the ID "big", then displays the full-screen overlay.
 *
 * @param {HTMLElement} card - The clicked image card or
 * container containing an <img> element.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example HTML:
 * // <div class="card" onclick="openImg(this)">
 * //     <img src="Team/Andra.jpg" alt="Team member">
 * // </div>
 *
 * // Clicking the card opens its image in the overlay.
 *
 * IMPORTANT:
 * The card must contain an image.
 * The HTML document must also contain elements with
 * the IDs "big" and "overlay".
 */
function openImg(card){

    // Find the image inside the selected card and get its URL.
    const img = card.querySelector("img").src;

    // Set the enlarged overlay image to the selected image.
    document.getElementById("big").src = img;

    // Display the overlay using Flexbox.
    // The CSS centers the image inside the overlay.
    document.getElementById("overlay").style.display = "flex";

}


/**
 * Closes the full-screen image overlay.
 *
 * The function hides the overlay by setting its
 * display property to "none".
 *
 * The currently selected image URL is not cleared.
 * It will be replaced the next time openImg() is called.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example HTML:
 * // <div id="overlay" onclick="closeImg()">
 * //     <img id="big">
 * // </div>
 *
 * // Clicking the overlay closes it.
 */
function closeImg(){

    // Hide the full-screen image overlay.
    document.getElementById("overlay").style.display = "none";

}


/* ============================================================
   3. ANIMATED STATISTICS COUNTERS
   ============================================================

   PURPOSE:
   Animate numerical statistics when the visitor
   scrolls to the history section.

   Instead of immediately displaying their final values,
   the counters increase gradually until they reach
   their targets.

   EXAMPLE:
   A counter with data-target="100" increases from
   its current displayed value toward 100.

   HTML DEPENDENCIES:
   .counter
      Identifies each number that should be animated.

   data-target
      Stores the number that a counter should reach.

   #history
      Identifies the section that triggers the animation.

   IMPORTANT:
   The animation is designed to run only once.
*/


/*
   Find all HTML elements with the class "counter".

   querySelectorAll() returns a NodeList containing
   every matching element in the document.

   The NodeList is stored so the function can animate
   each counter individually.

   The counters are selected when this script executes.
*/
const counters = document.querySelectorAll(".counter");


/*
   Track whether the counter animation has started.

   false:
      The animation has not started.

   true:
      The animation has already started.

   This prevents the counters from restarting every
   time the visitor scrolls.

   The variable is shared by startCounters() and
   persists between calls to that function.
*/
let started = false;


/**
 * Starts the statistics animations when the history
 * section reaches the required scroll position.
 *
 * The function:
 *
 * 1. Checks whether the animation has already started.
 * 2. Finds the history section.
 * 3. Measures the section's position in the viewport.
 * 4. Checks whether the section has entered the
 *    animation trigger area.
 * 5. Animates every element with the .counter class.
 * 6. Marks the animation as started.
 *
 * The animation begins when the top of the history
 * section is less than 100px above the viewport's
 * bottom edge.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example HTML:
 * // <section id="history">
 * //     <h3 class="counter" data-target="100">0</h3>
 * // </section>
 *
 * // The counter increases toward 100 when the
 * // history section enters the trigger area.
 *
 * IMPORTANT:
 * The HTML document must contain an element with
 * the ID "history".
 *
 * Counter text and data-target values must be numeric
 * for the arithmetic to work correctly.
 */
function startCounters(){

    /*
       Exit immediately if the animation has already started.

       This prevents repeated scroll events from starting
       multiple animations.
    */
    if(started) return;


    /*
       Find the history section using its HTML ID.

       The # symbol selects an element by ID.
    */
    const section = document.querySelector("#history");


    /*
       Determine the vertical position of the history section.

       getBoundingClientRect() returns the element's
       position and dimensions relative to the viewport.

       .top represents the distance from the viewport's
       top edge to the section's top edge.

       A positive value means the section begins below
       the viewport's top edge.

       A negative value means the section's top edge
       has moved above the viewport's top edge.
    */
    const sectionTop = section.getBoundingClientRect().top;


    /*
       Check whether the section has reached the trigger area.

       window.innerHeight:
          The height of the browser's visible viewport.

       window.innerHeight - 100:
          A position 100px above the viewport's bottom edge.

       The animation starts once the history section's
       top edge moves above this position.
    */
    if(sectionTop < window.innerHeight - 100){


        /*
           Loop through every counter.

           forEach() executes the provided callback
           once for each element in the counters NodeList.

           Each counter receives its own updateCounter()
           function and animation.
        */
        counters.forEach(counter => {


            /**
             * Updates one counter toward its target value.
             *
             * This function is defined inside the forEach
             * callback, so each counter has its own updater.
             *
             * It reads the target and current values,
             * calculates an increment, and updates the
             * displayed number.
             *
             * If the counter has not reached its target,
             * setTimeout() schedules another update.
             *
             * Once the current value reaches or exceeds
             * the target, the exact target is displayed.
             *
             * @returns {void} Does not return a value.
             *
             * IMPORTANT:
             * The increment is calculated as target / 80.
             * This determines the approximate number of
             * increments from a starting value of zero.
             *
             * Updates are scheduled approximately 25ms apart.
             * Actual timing depends on the browser.
             *
             * The displayed value is rounded upward using
             * Math.ceil().
             */
            const updateCounter = () => {


                /*
                   Retrieve the counter's target value.

                   getAttribute("data-target") reads the
                   value stored in the HTML attribute.

                   The unary + operator converts the
                   attribute's string value into a number.

                   Example:
                   "100" becomes 100.
                */
                const target = +counter.getAttribute("data-target");


                /*
                   Read the counter's currently displayed value.

                   innerText retrieves the visible text.

                   The unary + operator converts that
                   text into a number.
                */
                const current = +counter.innerText;


                /*
                   Calculate how much to increase the
                   counter during each update.

                   Dividing by 80 creates increments
                   based on the counter's target.

                   This is not a guaranteed 80-frame
                   animation because values are rounded
                   and update timing may vary.
                */
                const increment = target / 80;


                /*
                   Continue the animation while the
                   displayed value is below the target.
                */
                if(current < target){


                    /*
                       Increase the current value.

                       Math.ceil() rounds the result upward
                       to the nearest integer.

                       Example:
                       Math.ceil(4.2) becomes 5.
                    */
                    counter.innerText = Math.ceil(current + increment);


                    /*
                       Schedule another counter update
                       after approximately 25 milliseconds.

                       Passing updateCounter as a callback
                       allows the function to run again
                       without immediately calling itself.
                    */
                    setTimeout(updateCounter,25);


                }else{


                    /*
                       Set the counter to its exact target.

                       This ensures that the final displayed
                       value matches the data-target attribute,
                       even if an increment overshoots it.
                    */
                    counter.innerText = target;

                }

            };


            /*
               Start this counter's animation.

               Every counter begins its own update cycle.
            */
            updateCounter();

        });


        /*
           Mark the counter animation as started.

           Future calls to startCounters() return
           immediately because started is now true.
        */
        started = true;

    }

}


/*
   Register the scroll event listener.

   addEventListener() tells the browser to execute
   startCounters() whenever the window scrolls.

   The function is passed by reference.

   This means it is not executed immediately
   when the listener is registered.

   IMPORTANT:
   The original implementation starts counters
   through scroll events only.

   If the page loads with the history section
   already visible, the animation may wait until
   the next scroll event.
*/
window.addEventListener("scroll", startCounters);


/* ============================================================
   4. PHOTO GALLERY TABS
   ============================================================

   PURPOSE:
   Allow visitors to switch between different
   photo gallery categories.

   When a visitor selects a tab:
   - The previously active tab is deselected.
   - The selected tab becomes active.
   - Previously active gallery content is hidden.
   - The selected gallery content becomes visible.

   The CSS rules .gallery-tab.active and
   .gallery-content.active control the visual changes.

   HTML DEPENDENCIES:
   .gallery-tab
      Identifies each selectable gallery tab.

   .gallery-content
      Identifies each gallery content container.

   .active
      Indicates which tab and content are selected.
*/


/**
 * Activates a gallery tab and displays its associated content.
 *
 * The function removes the "active" class from all
 * gallery tabs and gallery content containers.
 *
 * It then adds "active" to the selected tab and
 * its corresponding gallery section.
 *
 * @param {string} section - The ID of the gallery content
 * to display, without the # symbol.
 *
 * @param {HTMLElement} tab - The gallery tab element
 * that the visitor selected.
 *
 * @returns {void} This function does not return a value.
 *
 * @example
 * // Example HTML:
 * // <div class="gallery-tab"
 * //      onclick="setGalleryTab('gallery2026', this)">
 * //     2026
 * // </div>
 *
 * // <div id="gallery2026" class="gallery-content">
 * //     ...
 * // </div>
 *
 * // Selecting the tab shows gallery2026.
 *
 * IMPORTANT:
 * The supplied section ID must exist in the document.
 *
 * The function searches the entire document for
 * .gallery-tab and .gallery-content elements.
 *
 * Therefore, all matching gallery elements are affected,
 * even if multiple galleries exist on the same page.
 */
function setGalleryTab(section, tab){


    /*
       Find every gallery tab and remove its active class.

       querySelectorAll() selects all matching elements.

       forEach() applies the class removal to each tab.

       This ensures that previously selected tabs
       are no longer marked active.
    */
    document.querySelectorAll(".gallery-tab")
        .forEach(t => t.classList.remove("active"));


    /*
       Mark the selected tab as active.

       The CSS rule .gallery-tab.active::after
       displays its red underline.
    */
    tab.classList.add("active");


    /*
       Find all gallery content containers.

       Remove the active class from each one so
       previously selected content is hidden.

       The CSS rule .gallery-content uses
       display: none when active is absent.
    */
    document.querySelectorAll(".gallery-content")
        .forEach(c => {
            c.classList.remove("active");
        });


    /*
       Find the gallery content associated with
       the selected tab.

       section contains the HTML ID as a string.

       Example:
       section = "gallery2026"

       getElementById() returns the matching element.
    */
    const target = document.getElementById(section);


    /*
       Activate the selected gallery content.

       The CSS rule .gallery-content.active
       changes its display to flex and opacity to 1.
    */
    target.classList.add("active");

}


/* ============================================================
   5. FREQUENTLY ASKED QUESTIONS (FAQ)
   ============================================================

   PURPOSE:
   Allow visitors to expand or collapse FAQ answers
   by clicking their corresponding questions.

   Each FAQ item contains:
   - A question element.
   - An answer element.

   Clicking a question toggles the active class
   on its parent FAQ item.

   CSS controls the actual expanding and collapsing
   of the answer.

   HTML DEPENDENCIES:
   .faq-question
      The clickable question element.

   .faq-item
      The parent container holding the question
      and its answer.

   .faq-answer
      The answer that expands or collapses.

   .active
      Controls the FAQ item's expanded state.
*/


/*
   Find every FAQ question in the document.

   querySelectorAll(".faq-question") returns
   a NodeList containing the matching elements.

   forEach() registers a click event listener
   on each question.

   IMPORTANT:
   These listeners are attached when this code runs.

   FAQ questions added to the page afterward
   will not automatically receive these listeners.
*/
document.querySelectorAll(".faq-question").forEach(q => {


    /*
       Register a click event listener for this question.

       When the visitor clicks the question,
       the callback function executes.
    */
    q.addEventListener("click", () => {


        /*
           Find the clicked question's parent element.

           In the expected HTML structure, this
           parent is the .faq-item container.

           The parent contains the question
           and its associated answer.
        */
        const item = q.parentElement;


        /*
           Toggle the active class on the FAQ item.

           classList.toggle("active") works as follows:

           If active is absent:
              Add active and expand the answer.

           If active is present:
              Remove active and collapse the answer.

           The CSS selector:
           .faq-item.active .faq-answer

           controls the expanded appearance.

           MAINTENANCE NOTE:
           Each FAQ item operates independently.

           Opening one answer does not automatically
           close any other open answers.
        */
        item.classList.toggle("active");

    });

});


/* ============================================================
   END OF JAVASCRIPT FILE
   ============================================================

   INTERACTIVE FEATURES SUMMARY:

   toggle(el)
      Expands or collapses content folders.

   openImg(card)
      Opens a selected image in the full-screen overlay.

   closeImg()
      Closes the full-screen image overlay.

   startCounters()
      Starts the statistics animation when the
      history section reaches the scroll trigger.

   updateCounter()
      Updates an individual statistic until it
      reaches its target value.

   setGalleryTab(section, tab)
      Switches the selected gallery tab and content.

   FAQ click listeners
      Expand or collapse individual FAQ answers.

   DOCUMENTATION:
   All original functions, selectors, variables,
   event listeners, and calculations are preserved.

   ============================================================ */