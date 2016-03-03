QUnit.test( "strictEqual test", function( assert ) {
  var allScholarElements = document.getElementsByClassName("scholar");
  var allResultElements = document.getElementsByClassName("scholar-result");
  var i = 0;
  for( i = 0; i < allScholarElements.length; i++ ) {
    assert.strictEqual( allScholarElements[i].innerHTML, allResultElements[i].innerHTML, allResultElements[i].innerHTML + " and " + allScholarElements[i].innerHTML + " have the same value and type" );
  }
});
