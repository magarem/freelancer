import { app, get } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';
const decoder = new TextDecoder('utf-8');

console.log('-------------------------------------------------------')

let Mtree = {
  out: '',
  build: function (data: any, espaco = 0): any{
    this.out += '<ul>'
    const obj = Object.entries(data)
    for (const [key, value] of obj) {
      if (typeof value == 'object') {
        this.out += '<li class=q><a class=expand>' + key + ':</a>'
      }else{
        this.out += '<li><a class=item>' + key.padEnd(10,'.') + ':</a>'
      }
      // this.out += '<li>' + this.pad(10, key, '.') + ':'
       if (typeof value == 'object' && value != null){
         espaco++
          this.build(value, espaco)
         espaco--
       }else{
         espaco++
         this.out += '<input style="margin-left: 2px;" type=text value="' + value + '"></li>'
         espaco--
       }
    }
    this.out += '</ul>'
  // return out
  }
}



app(
  get('/:dataFile',
    async ({ params }) => {
      const data_ = decoder.decode(await Deno.readFile('../content/' + params.dataFile));
      const data = JSON.parse(data_);
      Mtree.out = ''
      Mtree.build(data)
      return await renderFile('./tela.ejs', {
        tree: Mtree.out
      })
    }
  )
)
