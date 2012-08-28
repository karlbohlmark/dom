
var dom = require('dom');

describe('dom(id)', function(){
  it('should return an element by id', function(){
    var list = dom('<ul><li id="one">foo</li><li id="two">bar</li></ul>');
    list = dom('#two', list);
    assert(1 == list.length(), 'expected length of 1');
    assert('bar' == list.get(0).textContent);
  })
})

describe('dom(html)', function(){
  it('should return a dom List of elements', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get(0).textContent);
  })
})

describe('.length()', function(){
  it('should return the number of elements', function(){
    var list = dom('<em>Hello</em>');
    assert(1 == list.length());
  })
})

describe('.get(i)', function(){
  it('should return the element at i', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.get(0).textContent);
  })
})

describe('.at(i)', function(){
  it('should return the element at i as a List', function(){
    var list = dom('<em>Hello</em>');
    assert('Hello' == list.at(0).get(0).textContent);
  })
})

describe('.first()', function(){
  it('should return the first element in the List', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('foo' == list.first().text());
  })
})

describe('.last()', function(){
  it('should return the last element in the List', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');
    assert('bar' == list.last().text());
  })
})

describe('.addClass(name)', function(){
  it('should add the given class name', function(){
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar');
    assert('foo bar' == list.get(0).className);
  })
})

describe('.removeClass(name)', function(){
  it('should remove the given class name', function(){
    var list = dom('<em>Hello</em>');
    list.addClass('foo').addClass('bar').removeClass('foo');
    assert('bar' == list.get(0).className);
  })
})

describe('.toggleClass(name)', function(){
  it('should toggle the given class name', function(){
    var list = dom('<em>Hello</em>');

    list.toggleClass('show');
    assert('show' == list.get(0).className);

    list.toggleClass('show');
    assert('' == list.get(0).className);
  })
})

describe('.hasClass(name)', function(){
  it('should return true when the classname is present', function(){
    var list = dom('<em>Hello</em>').addClass('show');
    assert(true === list.hasClass('show'));
  })

  it('should return false when the classname is not present', function(){
    var list = dom('<em>Hello</em>').addClass('show');
    assert(false === list.hasClass('hide'));
  })
})

describe('.find(selector)', function(){
  it('should return descendants matching the selector', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>');
    list = list.find('li');
    assert(2 == list.length());
  })
})

describe('.each(fn)', function(){
  it('should iterate passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.each(function(el, i){
      indexes.push(i);
      values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(values[0] instanceof dom.List, 'values should be dom lists');
    assert(list.get(0) == values[0].get(0));
    assert(list.get(1) == values[1].get(0));
  })
})

describe('.forEach(fn)', function(){
  it('should iterate passing (el, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var indexes = [];
    var values = [];
    var ret = list.forEach(function(el, i){
      indexes.push(i);
      values.push(el);
    });

    assert(ret == list, 'should return self for chaining');
    assert(0 == indexes[0]);
    assert(1 == indexes[1]);
    assert(!(values[0] instanceof dom.List), 'values should be elements');
    assert(list.get(0) == values[0]);
    assert(list.get(1) == values[1]);
  })
})

describe('.map(fn)', function(){
  it('should map passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var ret = list.map(function(el, i){
      return el.text();
    }).join('|');

    assert('foo|bar' == ret);
  })
})

describe('.select(fn)', function(){
  it('should filter passing (list, i)', function(){
    var list = dom('<ul><li>foo</li><li>bar</li></ul>').find('li');

    var selected = list.select(function(el){
      return el.text() == 'bar';
    });

    assert(1 == selected.length(), 'invalid length');
    assert(selected.get(0) == list.get(1));
  })
})

describe('.filter(fn)', function(){
  it('should alias .select', function(){
    assert(dom.List.prototype.filter == dom.List.prototype.select);
  })
})

describe('.css(prop, value)', function(){
  it('should set a style value', function(){
    var list = dom('<em>Hello</em>');
    list.css('display', 'none');
    assert('none' == list.get(0).style.display);
  })
})

describe('.css(prop)', function(){
  it('should get a style value', function(){
    var list = dom('<em>Hello</em>');
    list.css('display', 'none');
    assert('none' == list.css('display'));
  })
})