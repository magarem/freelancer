import { app, get } from 'https://denopkg.com/syumai/dinatra/mod.ts';
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';
const decoder = new TextDecoder('utf-8');
const data_ = decoder.decode(await Deno.readFile('./content/data.json'));

const data = JSON.parse(data_);

var split_by_chars = (str: string, str_begin: string, str_end = 'XXX'): string => {
  // Client info split parans
  var begin = str.indexOf(str_begin)
  // if (!str_end) str_end = str.length
  var end = str.indexOf(str_end)
  if (end==-1) {end = str.length}
  return str.substr(begin+1, (end - begin - 1));
}

app(
  get('/',
     async ({ params }) => {
       var clientInfo = params.clientInfo
       var session = params.session
       var width = params.width
       var timestamp = params.timestamp|0

       if ((Math.floor(Date.now() / 1000) - timestamp) > 7){
         return await renderFile('./views/width.ejs', {
           session: Math.random().toString(36).substr(2),
           timestamp: Math.floor(Date.now() / 1000)
         })
       } else {


         return await renderFile('./views/theme1/index.ejs', {
           data: data,
           device: (+width > 900)?'desktop':'phone'
         })
       }
    }
  )
)
