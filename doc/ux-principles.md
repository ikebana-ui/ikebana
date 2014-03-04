# Golden Ratio

* Fibonacci series
* **1.618**

# Visual design

* Size of the color palette for a website?
* Adobe Kuler - palette of 6 colors, 3 primary and 3 secondary
  * Q. How will I pick which color as the major primary out of the 3?
  * A. Based on brand, color wheel. (for MVP we are limiting to two colors by default)
    
* Monotone, single color, grayscale
* Try to use green-shades for primary/positive actions; red-shades for negative actions
  * If you theme prevents you from doing that, use darker/lighter shades of green/red.
* Primary color: Blue, Green and Gray
  * Blue: more prominent colors
  * Gray: general
* Secondary colors: Red, Yellow etc.
* E.g. Tab header: if there's no header using primary color, then the secondary color used on the Tab header becomes the primary color.

## Component-level UX

### Progress bar

### Buttons

* Undoable actions
  * Use background color as red?
* Equal prominence buttons. E.g. Yes and No, Accept and Cancel
  * Small distance
  * Color difference
* Secondary action as link, instead of a button
* Same weight actions, but not opposite
* Icon buttons
  * Icon and text are split according to the golden ratio
* Drop down button
* Split button
* Buttons without icons
* 3D, Borderless button
* Button sizes
  * Based on the base `font-size`
  * `padding`, `border-radius` etc. based on the golden ratio
  * The button width and height will follow golden ratio but not follow the typography golden ratio

### Typography

* Accessibility
  * Readability
    * `font-size` (e.g. older folks need a larger font size)
    * background/foreground contrast, background noise. Luminosity threshold. We need to define it.
    * Sequential increase of text, depends on amount of text your brain can process
* Safe reading font-size, don't strain users size
* Ability to increase/decrease font-size
* Different `font-face`s in the entire page: **3**
  * Header, header 2, body
  * Header, body, button
* Line length, the number of letters in a line
  * https://baymard.com/blog/line-length-readability
* Hierarchy
  * Font variations (sizes, contrast ratio) on menu, sub-menu, system menu and footer text
  * Brand font (third-party)
* Levels **3**
* Should `h6` be smaller than the body font
* Avoid bottom border
  * If required, then use non-contrasting colors for underlining
* Do not use blue color and blue underline, as it may look like a link
* Line height
  * According to The Gestalt Principles: any two objects placed together look related
  * Keep this in mind when creating margins between headers and body text
* Using all caps reduces reading speed

### Forms
* Error messages should help the user rectify the error and not just say there is an error.
* HTML5 error messages, say, `required`, how will we handle it?
* Labels vs placeholders
  * Placeholders: once you type, the placeholder text disappears and if you blink you forget what that text box was meant for.
