## 👨‍💻 快速开始 - HTML

为了让内容能够被 LazyLoad 懒加载，必须使用 `data-` 属性而不是实际属性。以下是各种使用场景的示例。

### 懒加载图片

最基本的懒加载图片用法：

```html
<img alt="A lazy image" class="lazy" data-src="lazy.jpg" />
```

### 带占位符的懒加载图片

如果需要显示低质量占位图，可以在 `img` 标签中添加 `src` 属性，指向一个非常小的图片版本。例如：`src="lazy_10.jpg"`。

```html
<img alt="A lazy image" class="lazy" src="lazy-lowQuality.jpg" data-src="lazy.jpg" />
```

### 响应式图片懒加载（带 srcset 和 sizes）

适用于需要根据屏幕尺寸加载不同分辨率图片的场景：

```html
<img
  alt="A lazy image"
  class="lazy"
  data-src="lazy.jpg"
  data-srcset="lazy_400.jpg 400w,lazy_800.jpg 800w"
  data-sizes="100w"
/>
```

### 懒加载背景图片

⚠ **重要提示**：在页面中显示内容图片时，应始终使用 `img` 标签。这将有利于网站的 SEO 和可访问性。要判断图片是内容图片还是背景图片，可以问自己："用户打印页面时是否希望看到这些图片？"如果答案是"是"，那么这些图片就是内容图片，应该避免使用背景图片来显示它们。

#### 单个背景图片

```html
<div class="lazy" data-bg="lazy.jpg"></div>
```

#### 单个背景图片（支持高分辨率屏幕）

```html
<div class="lazy" data-bg="lazy.jpg" data-bg-hidpi="lazy@2x.jpg"></div>
```

#### 多个背景图片

```html
<div
  class="lazy"
  data-bg-multi="url(lazy-head.jpg), 
    url(lazy-body.jpg), 
    linear-gradient(#fff, #ccc)"
>
  ...
</div>
```

#### 多个背景图片（支持高分辨率屏幕）

```html
<div
  class="lazy"
  data-bg-multi="url(lazy-head.jpg),url(lazy-body.jpg),linear-gradient(#fff, #ccc)"
  data-bg-multi-hidpi="url(lazy-head@2x.jpg),url(lazy-body@2x.jpg), linear-gradient(#fff, #ccc)"
>
  ...
</div>
```

#### 使用 `image-set` 的背景图片

```html
<div class="lazy" data-bg-set="url('lazy@1x.jpg') 1x, url('lazy@2x.jpg') 2x">...</div>
```

#### 使用 `image-set` 的多个背景图片

```html
<div
  class="lazy"
  data-bg-set="
    url('lazy-head@1x.jpg') 1x, url('lazy-head@2x.jpg') 2x | 
    url('lazy-body@1x.jpg') 1x, url('lazy-body@2x.jpg') 2x
  "
>
  ...
</div>
```

### 懒加载 SVG 动画

```html
<object class="lazy" type="image/svg+xml" data-src="lazy.svg"></object>
```

### 懒加载视频

```html
<video class="lazy" controls width="620" data-src="lazy.mp4" data-poster="lazy.jpg">
  <source type="video/mp4" data-src="lazy.mp4" />
  <source type="video/ogg" data-src="lazy.ogg" />
  <source type="video/avi" data-src="lazy.avi" />
</video>
```

> **注意**：视频的封面图（poster）也可以进行懒加载。

### 懒加载 iframe

```html
<iframe class="lazy" data-src="lazyFrame.html"></iframe>
```