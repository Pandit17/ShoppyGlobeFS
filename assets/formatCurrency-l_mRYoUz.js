function t(r,e="USD"){const n=typeof r=="number"?r:Number(r)||0;return new Intl.NumberFormat("en-US",{style:"currency",currency:e}).format(n)}export{t as f};
