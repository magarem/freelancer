import { app, get } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';
const decoder = new TextDecoder('utf-8');
function arrayTest(y: any){
  var ret = [] as any
  y.forEach(function(o: any){
    ret.push(o.split('.').map(function(x: any){if (x == +x) {return '[' + x + ']'} else {return x}}).join('.'))
  })
  return ret
}
console.log('-------------------------------------------------------')

let Mtree = {
  out: '',
  keys: [] as any,
  ids: [] as any,
  arrayTest: function arrayTest(y: any){
    return  y.split('.').map(function(x: any){if (x == +x) {return '[' + x + ']'} else {return x}}).join('.').replace('.[', '[')
  },
  build: function (data: any, espaco = 0): any{
    var self = this
    this.out += '<ul>'
    const obj = Object.entries(data)
    for (const [key, value] of obj) {
      if (typeof value == 'object') {
        this.out += '<li class=q><a class=expand>' + key + ':</a>\n'
      }else{
        this.out += '<li><a class=item>' + key.padEnd(10,'.') + ':</a>\n'
      }
      // this.out += '<li>' + this.pad(10, key, '.') + ':'
       if (typeof value == 'object' && value != null){
         espaco++
         this.keys.push(key);
         this.build(value, espaco)
         this.out += '</li>'
         this.keys.pop()
         espaco--
       }else{
         espaco++
         this.keys.push(key);

         var aa = this.arrayTest(this.keys.join('.'))


         this.out += '<input id=' + aa + ' style="margin-left: 2px;" type=text value="' + value + '"></li>\n'
         this.ids.push(this.keys.join('.'))
         this.keys.pop()
         espaco--
       }
    }
    this.out += '</ul>\n'
  // return out
  }
}




app(
  get('/:dataFile',
    async ({ params }) => {
      const data_ = decoder.decode(await Deno.readFile('../content/' + params.dataFile));
      const data = JSON.parse(data_);
      console.log(data);

      Mtree.out = ''
      Mtree.build(data)
      return await renderFile('./tela.ejs', {
        data: JSON.stringify(data),
        tree: Mtree.out,
        ids: JSON.stringify(arrayTest(Mtree.ids))
      })
    }
  )
)
