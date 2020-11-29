const Text = require('../modules/Text');
const _ = require('loadsh');
const xss = require('xss');

exports.getTextList = async (ctx, next) => {
  let page = Number(ctx.request.query.page) || 1;
  let pageSize = Number(ctx.request.query.pageSize) || 10;
  let category = ctx.request.query.category;

  const filters = category
    ? {
        category: xss(_.trim(category)),
      }
    : null;

  let start = (page - 1) * pageSize; //开始位置

  const data = await Text.find(filters).skip(start).limit(pageSize).exec();

  const total = await Text.count();

  const result = {
    code: 200,
    response: data,
    total,
  };

  ctx.response.body = result;
  return result;
};

exports.addText = async (ctx, next) => {
  const jsonRequestBody = ctx.request.body;

  const existInfo = await Text.find({
    text: xss(_.trim(jsonRequestBody.text)),
  });

  let result = {};

  if (existInfo.length) {
    result = {
      code: 200,
      errormsg: '文案已存在',
      ts: 12345,
    };
  } else {
    let newText = new Text({
      text: xss(_.trim(jsonRequestBody.text)),
      author: xss(_.trim(jsonRequestBody.author)),
      origin: xss(_.trim(jsonRequestBody.origin)),
      date: xss(_.trim(new Date().getTime())),
      category: xss(_.trim(jsonRequestBody.category)),
    });
    const data = await newText.save();
    result = {
      code: 200,
      response: data,
      ts: 12345,
    };
  }

  ctx.response.body = result;
  return result;
};

exports.deleteText = async (ctx, next) => {
  const data = await Text.remove({ _id: ctx.params.id });

  const result = {
    code: 200,
    response: data,
  };
  ctx.response.body = result;
  return result;
};

exports.updateText = async (ctx, next) => {
  const jsonRequestBody = ctx.request.body;

  const existInfo = await Text.find({
    text: xss(_.trim(jsonRequestBody.text)),
  });

  let result = {};

  if (existInfo.length) {
    result = {
      code: 200,
      errormsg: '文案已存在,不可修改',
      ts: 12345,
    };
  } else {
    const data = await Text.updateOne(
      {
        _id: xss(_.trim(jsonRequestBody._id)),
      },
      {
        $set: {
          text: xss(_.trim(jsonRequestBody.text)),
          author: xss(_.trim(jsonRequestBody.author)),
          origin: xss(_.trim(jsonRequestBody.origin)),
          date: xss(_.trim(new Date().getTime())),
          category: xss(_.trim(jsonRequestBody.category)),
        },
      }
    );

    result = {
      code: 200,
      response: data,
    };
  }

  ctx.response.body = result;
  return result;
};

exports.getTextInfoById = async (ctx, next) => {
  let val = null;
  console.log(ctx.params.id);
  const data = await Text.findOne({ _id: ctx.params.id });

  const result = {
    code: 200,
    response: data,
  };
  ctx.response.body = result;
  return result;
};
