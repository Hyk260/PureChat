## 用法

### Get 请求

```
import http from "@/utils/http/index";

// params传参
http('get', '/xxx', { params: param });

// url拼接传参
http('get', '/xxx?message=' + msg);
```

### Post 请求

```
import http from "@/utils/http/index";

// params传参
http('post', '/xxx', { params: param });

// data传参
http('post', '/xxx', { data: param });
```

## 两种方式的比较

**GET 请求：**

1. 一般用于信息`获取`：通过发送一个请求来取得服务器上的资源；
2. 数据包含在 URL 地址中；
3. 数据量受 URL 的长度限制；
4. 不安全：浏览器的 URL `可见`到，明文传输；
5. GET 请求`会被缓存`；
6. GET 没有请求主体，请求速度相对较快。

**POST 请求：**

1. 一般用于`修改`服务器上的资源：向指定资源提交数据，后端处理请求后往往会导致服务器 建立新的资源 或 修改已有资源；
2. 数据包含在请求主体中；
3. 没有数据量限制，可在服务器的配置里进行限制；
4. 只能是比 GET `安全`，实际上也是不安全的：可通过开发者工具或者抓包看到，明文传输；
5. POST 请求`不会缓存`；
6. POST 相对稳定、可靠：可发送包含未知字符的内容。

**容易产生的误区**：HTTP 协议里并没有限制 GET 和 POST 的长度，GET 的最大长度限制是因为浏览器和 Web 服务器对 URL 的长度限制，不同的浏览器和 Web 服务器限制的最大长度不一样，它们所限制的是整个 URL 的长度，而不仅仅是查询参数的数据长度。
