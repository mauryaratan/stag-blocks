=== Stag Blocks ===
Plugin URI: https://stagblocks.com/
Author URI: https://codestag.com/
Contributors: mauryaratan, codestag
Tags: Gutenberg, editor, blocks, codestag, testimonial, website, alert, accordion, builder, hero, posts-grid, pricing-table, stats
Donate link: https://codest.ag/st-donate
Requires at least: 5.0
Requires PHP: 5.6
Tested up to: 5.0.2
Stable Tag: 1.1.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Stag Blocks extends Gutenberg editor for WordPress, by adding a number of handy blocks for your website.

= A better way to build with WordPress =
With the introduction of [Gutenberg](https://wordpress.org/gutenberg/), it's never been easier to create content with WordPress.
We created *Stag Blocks* to assist you in building your content with Gutenberg in WordPress. Stag Blocks offers many chunk of content blocks that helps you put together a page real quick. Here's a quick overview on what it offers:

= Blocks =
* [Accordion](https://stagblocks.com/block/accordion-block) — Display a togglable field that can be expanded and collapsed.
* [Alert](https://stagblocks.com/block/alert-block) — Display a notice with customizable icon, title, and description.
* [Container](https://stagblocks.com/block/container-block) — Add a container block which can be used to fit multiple blocks inside it.
* [Hero](https://stagblocks.com/block/hero-block) — Add a full width media block to accompany a call to action.
* [Posts Grid](https://stagblocks.com/block/posts-grid-block) — Display a grid or list of customizable posts.
* [Pricing Table](https://stagblocks.com/block/pricing-table-block) — Add a pricing table block to showcase different plans and offers.
* [Profile](https://stagblocks.com/block/profile-block) — Displays a nice author profile info box with social links.
* [Stats](https://stagblocks.com/block/stats-block) — Display useful custom stats for just about anything.
* [Testimonial](https://stagblocks.com/block/testimonial-block) — Add a user testimonial with name, company, text, and picture.
* [Website Card](https://stagblocks.com/block/website-card-block) — Turn a URL into a pretty card style preview.

We're also cooking an absolutely free WordPress theme, 100% compatible with Gutenberg. Visit [StagBlocks.com](https://stagblocks.com) for more info on and download.

= Follow Along =
* [Visit Codestag site](https://codestag.com/)
* [Follow on Twitter](https://twitter.com/Codestag)
* [Check our themes](https://codestag.com/themes/)

== Frequently Asked Questions ==

= Installation =
1. Upload the Stag Blocks folder to the `wp-content/plugins` directory
2. Activate the plugin through the ‘Plugins’ menu in WordPress

= Can I use my own themes? =
Absolutely! Stag Blocks gets out of the way and is designed to work with any theme’s styles.

== Screenshots ==
1. Stag Blocks settings page.
2. Accordion block - Display a togglable field that can be expanded and collapsed.
3. Alert Block - Display a notice with customizable icon, title, and description.
4. Container Block - Add a container block which can be used to fit multiple blocks inside it.
5. Hero — Add a full width media block to accompany a call to action.
6. Posts Grid Block — Display a grid or list of customizable posts.
7. Pricing Table Block — Add a pricing table block to showcase different plans and offers.
8. Stats — Display useful custom stats for just about anything.
9. Testimonial — Add a user testimonial with name, company, text, and picture.
10. Website Card Block — Turn a URL into a pretty card style preview.

== Changelog ==
= 1.1.6 =
* Fixed an issue with Hero block not saving content
* Fixed an issue where block search would break due to incorrect datatype
* Hide toggle field label on settings page

= 1.1.5 =
* Compatibility with WordPress 5.0 RC2
* Fix fatal error where deactivate_plugins function didn’t exist
* Fixed an issue with Post grid block category throwing an error
* Remove post_excerpt filter from post grid block
* Fix editor stylesheet dependency

= 1.1.4 =
* Compatibility with WordPress 5.0 RC

= 1.1.3 =
* Fix WP Blocks dependencies

= 1.1.2 =
* Fix Settings page showing blank page
* Remove 24h based blocks data sync, now syncs on each load for better consistency.

= 1.1.1 =
* Fix dist folder missing since v1.1.0

= 1.1.0 =
* 🎉 NEW: Profile block - Displays a nice author profile info box with social links.
* 👌 Update all block icons
* Fix typo on Setting page text. Props @dannycooper
* Remove deprecated withAPIData in favor of withSelect in Posts Grid Block
* Ensure titles don't break in Posts Grid block

= 1.0.0 =
* Initial release.
