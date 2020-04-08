import { app, get } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';
const decoder = new TextDecoder('utf-8');
const data_ = decoder.decode(await Deno.readFile('../content/data.json'));

const data = JSON.parse(data_);

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')

let Mtree = {
  out: '',
  pad: function (width: any, string: any, padding: any): any {
    return (width <= string.length) ? string : this.pad(width, padding + string, padding)
  },
  build: function (data: any, espaco = 0): any{
    this.out += '<ul>'
    const obj = Object.entries(data)
    for (const [key, value] of obj) {
      if (typeof value == 'object') {
        this.out += '<li><a class=expand>' + this.pad(0, key, '.') + '</a>:'
      }else{
        this.out += '<li><a class=expand>' + this.pad(10, key, '.') + '</a>:'
      }
      // this.out += '<li>' + this.pad(10, key, '.') + ':'
       if (typeof value == 'object' && value != null){
         espaco++
          this.build(value, espaco)
         espaco--
       }else{
         espaco++
         this.out += ' <input type=text value="' + value + '"></li>'
         espaco--
       }
    }
    this.out += '</ul>'
  // return out
  }
}

Mtree.build(data)

app(
  get('/',
    async ({ params }) => {
      return await renderFile('./tela.ejs', {
        tree: Mtree.out
      })
    }
  )
)
// console.log(typeof value)
  // if (typeof value == 'object'){
  //   const obj = Object.entries(data)
  //   for (const [key, value] of obj) {
  //     console.log(key,'--->', value)
  //   }
  // }


// console.log(data);
