import { app, get, post } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';
const decoder = new TextDecoder('utf-8');


var split_by_chars = (str: string, str_begin: string, str_end = 'XXX'): string => {
  // Client info split parans
  var begin = str.indexOf(str_begin)
  // if (!str_end) str_end = str.length
  var end = str.indexOf(str_end)
  if (end==-1) {end = str.length}
  return str.substr(begin+1, (end - begin - 1));
}

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
         this.ids.push(aa)
         this.keys.pop()
         espaco--
       }
    }
    this.out += '</ul>\n'
  // return out
  }
}


app(
  get('/',
     async ({ params }) => {
       var clientInfo = params.clientInfo
       var session = params.session
       var width = params.width
       var timestamp = params.timestamp|0

       const data_ = decoder.decode(await Deno.readFile('./content/data.json'));
       const data = JSON.parse(data_);

       if ((Math.floor(Date.now() / 1000) - timestamp) > 7){
         return await renderFile('./views/width.ejs', {
           session: Math.random().toString(36).substr(2),
           timestamp: Math.floor(Date.now() / 1000)
         })
       } else {
         return await renderFile('./views/theme1/index.ejs', {
           data: data.site,
           device: (+width > 900)?'desktop':'phone'
         })

       }
    }
  ),
  post('/edit/save', async ({ params }) => {
    var site = {site: params.site}
    var dataFileName = params.dataFileName
    const encoder = new TextEncoder();
    Deno.writeFile('./content/' + dataFileName, encoder.encode(JSON.stringify(site, null, 2)));
    return `${site}!`
  }),
  get('/edit/:dataFile',
    async ({ params }) => {
      const data_ = decoder.decode(await Deno.readFile('./content/' + params.dataFile));
      const data = JSON.parse(data_);

      Mtree.out = ''
      Mtree.build(data)
      return await renderFile('./views/adm/tela.ejs', {
        data: JSON.stringify(data),
        tree: Mtree.out,
        ids: JSON.stringify(arrayTest(Mtree.ids))
      })
    }
  )
)
