function setCache (key, value) {
  const secsExp = 2 * 60 * 60; // 2 hours
  CacheService.getDocumentCache().put(md5(key), JSON.stringify(value), secsExp);
};

function getCache (key) {
  var value = CacheService.getDocumentCache().get(md5(key));
  try{
    return JSON.parse(value)
  }catch{
    return null;
  }
};

function md5 (key) {
  const keyLowerClean = key.toLowerCase().replace(/\s/g, "");
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, keyLowerClean));
};

function CallWithCache(fn,args){
  const key = [fn.name].concat(args.map(v=>""+v)).join("|");
  console.log(`cache key:${key}`);
  var value = getCache(key);
  if (value !== null){
    console.log("cache hit");
    return value;
  }
  console.log("cache miss");
  value = fn(...args);
  setCache(key, value);
  return value;
}
