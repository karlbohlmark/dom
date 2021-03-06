
build: index.js components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

test:
	@mocha-phantomjs -R dot test/index.html

.PHONY: clean test
