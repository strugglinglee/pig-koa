const Category = require('../modules/Category');
const _ = require('loadsh');
const xss = require('xss');

exports.getCategoryList = async (ctx, next) => {
  let page = Number(ctx.request.query.page) || 1;
  let pageSize = Number(ctx.request.query.pageSize) || 10;

  let start = (page - 1) * pageSize; //开始位置

  const data = await Category.find().skip(start).limit(pageSize).exec();

  const total = await Category.count();

  const result = {
    code: 200,
    response: data,
    total,
  };

  ctx.response.body = result;
  return result;
};

exports.addCategory = async (ctx, next) => {
  const jsonRequestBody = ctx.request.body;

  const existInfo = await Category.find(
    {
      $or:[
        { name: xss(_.trim(jsonRequestBody.name))} ,
        {type: xss(_.trim(jsonRequestBody.type))}
      ]
    }
  )

  let result={}

  if (existInfo.length) {
    result={
      code: 200,
      errormsg:"分类已存在",
      ts: 12345
    }
  } else {
    let newCategory = new Category({
      type: xss(_.trim(jsonRequestBody.type)),
      name: xss(_.trim(jsonRequestBody.name)),
      date: xss(_.trim(new Date().getTime())),
    });
    const data = await newCategory.save();
    result = {
      code: 200,
      response: data,
      ts: 12345,
    };
  }

  ctx.response.body = result;
  return result;
};

exports.deleteCategory = async (ctx, next) => {
  let val = null;
  const data = await Category.remove({ _id: ctx.params.id });

  const result = {
    code: 200,
    response: data,
  };
  ctx.response.body = result;
  return result;
};

exports.updateCategory = async (ctx, next) => {
  let result={}
  const jsonRequestBody = ctx.request.body;

  const existInfo = await Category.find(
    {
      $or:[
        { name: xss(_.trim(jsonRequestBody.name))} ,
        {type: xss(_.trim(jsonRequestBody.type))}
      ]
    }
  )

  if (existInfo.length) {
    result={
      code: 200,
      errormsg:"分类已存在,不可修改",
      ts: 12345
    }
  } else {
    const data = await Category.updateOne(
      {
        _id: xss(_.trim(jsonRequestBody._id)),
      },
      {
        $set: {
          type: xss(_.trim(jsonRequestBody.type)),
          name: xss(_.trim(jsonRequestBody.name)),
          date: xss(_.trim(new Date().getTime())),
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

exports.getCategoryInfoById = async (ctx, next) => {
  let val = null;
  console.log(ctx.params.id);
  const data = await Category.findOne({ _id: ctx.params.id });

  const result = {
    code: 200,
    response: data,
  };
  ctx.response.body = result;
  return result;
};
