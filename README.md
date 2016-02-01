# scholar.js shows dynamically your citation count on your publication list.

## Aim

Show your publication count for all your publications, from Google Scholar.

## Requirements

- Internet access (it asks [Google Scholar](http://scholar.google.com/) on page load).
- [jQuery](http://jquery.com/).
- custom [jQuery.ajax mid - CROSS DOMAIN AJAX](https://github.com/padolsey-archive/jquery.fn/tree/master/cross-domain-ajax) from @padolsey-archive (to load Google Scholar directly from js. Included inside scholar.js to remove a dependence).

## Usage

Import jQuery and scholar.js:

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="dist/scholar.js"></script>
```

or from CDN (kha.li is my server):

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="http://kha.li/dist/scholar/scholar-0.1.min.js"></script>
```

Load results with your Google Scholar ID:

```js
Scholar.load("YOUR-GOOGLE-SCHOLAR-ID"); // Find it on your Google Scholar profile
```

Then, add span (or whatever) where you want to get your publication count:

```html
<span class="scholar" name="PUBLICATION-NAME" with-link="true"></span>
```

## Example

```html
<html>
  <head>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="http://kha.li/dist/scholar/scholar-0.1.min.js"></script>
    <script type="text/javascript">
      Scholar.load("-BL0_2EAAAAJ");
    </script>
  </head>
  <body>
    <p>Integral based Curvature Estimators in Digital Geometry -
      <span class="scholar"
            name="Integral based Curvature Estimators in Digital Geometry"
            with-link="true">
        <!-- add a loading image here -->
      </span>
    </p>
  </body>
</html>
```

### Result

> Integral based Curvature Estimators in Digital Geometry - [12](https://scholar.google.fr/citations?view_op=view_citation&hl=fr&user=-BL0_2EAAAAJ&citation_for_view=-BL0_2EAAAAJ:u5HHmVD_uO8C)


## LICENSE

All this work is under [Creative Commons CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/) license, see [LICENSE.md](https://github.com/jlevallois/scholar.js/blob/master/LICENSE.md)

:octocat:
