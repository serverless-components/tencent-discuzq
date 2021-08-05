<?php
$SELF_VERSION = "2.3.210208";

set_time_limit(300);
error_reporting(E_ALL ^ E_WARNING);

define('PACKAGE_BASE', 'https://cloud.discuz.chat/');

lock_file_guard();
$SCRIPT_NAME = basename(__FILE__);
$STEP = get_step();
if ($STEP === FALSE) redirect("/" . $SCRIPT_NAME . "?step=0");
if ($STEP == 1 && existing_installation()) save_current_ver_as_old_ver();
$STEPS = build_steps();

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

//region 主页面
?>

<!doctype html>
<html lang="zh-cn">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Discuz! Q 安装/升级向导 </title>
	<link href="https://dl.discuz.chat/lib/4.5.0/bootstrap.min.css" rel="stylesheet">
	<script src="https://dl.discuz.chat/lib/4.5.0/jquery.min.js"></script>
	<script src="https://dl.discuz.chat/lib/4.5.0/bootstrap.min.js"></script>
	<style>
		html {
			font-size: 16px;
		}

		body {
			font-family: -apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
			font-weight: 500
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-bottom: 0;
		}

		p {
			margin-top: 0.25em;
			margin-bottom: 0.25em;
		}

		.container {
			max-width: 960px;
			padding-top: 80px;
		}

		.navbar .in .nav li {
			display: block;
			float: none;
			width: 100%;
		}

		.hidden {
			display: none;
		}

		.pre-logs {
			max-height: 480px;
			overflow-y: auto;
			margin: 1em 1em 1em 1em;
		}
	</style>
	<script>
		function next_step() {
			$('#button_next').addClass('disabled');
			$('#spinner').removeClass('hidden');
			var user_form = $('#userform');
			if (user_form.length !== 0) {
				user_form.submit();
				return;
			}
			var user_form_install = $('#userforminstall');
			if (user_form_install.length !== 0) {
				$.post('<?= get_server_url() . "/install" ?>', user_form_install.serialize())
					.done(function(data) {
						localStorage.clear();
						localStorage.setItem('officeDb_Authorization', JSON.stringify(data.token));
						window.location.href = '/';
					})
					.fail(function(data) {
						$('#button_next').removeClass('disabled');
						$('#spinner').addClass('hidden');
						$('#errormsgdiv').removeClass('hidden');
						if (data.responseText !== undefined) {
							$('#errormsg').text("错误信息：" + data.responseText);
						} else {
							$('#errormsg').text("错误信息：" + data);
						}
					});

				return;
			}
			window.location.href = "/<?= $SCRIPT_NAME ?>?step=<?= $STEP + 1 ?>";
		}
	</script>
</head>

<body>
	<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
		<a class="navbar-brand" href=""><img alt="Discuz! Q" src="https://dl.discuz.chat/logo.png" height="32" /> 安装/升级向导 </a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<span class="navbar-text">
			<?= $SELF_VERSION ?>
		</span>
	</nav>
	<div class="container">
		<div class="d-flex justify-content-center">
			<div class="spinner-border hidden my-3" role="status" id="spinner">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<?php try {
			$func = $STEPS[$STEP];
			if ($func) {
				call_user_func($func);
			} else {
				redirect("/" . $SCRIPT_NAME . "?step=0");
			} ?>
			<div class="row mb-3">
				<div class="col">
					<?php if ($STEP > 0) { ?>
						<a class="btn btn-outline-secondary" href="javascript:history.back()">上一步</a>
					<?php } ?>
					<a class="btn btn-primary float-right" id="button_next" href="javascript:next_step();">下一步</a>
				</div>
			</div>
		<?php } catch (Exception $e) { ?>
			<div class="alert alert-danger" role="alert">
				<p>安装无法继续，请纠正以下错误。</p>
				<p>错误信息：</p>
				<p><?= $e->getMessage() ?></p>
			</div>
			<div class="row mb-3">
				<div class="col">
					<?php if ($STEP > 1) { ?>
						<a class="btn btn-outline-secondary" href="javascript:history.back()">上一步</a>
					<?php } ?>
					<a class="btn btn-outline-primary float-right" href="javascript:window.location.href=window.location.href">重试</a>
				</div>
			</div>
		<?php } ?>
	</div>

</body>

</html>

<?php
//endregion

//region 锁定文件
/**
 * 检查锁定文件是否存在，如果存在就显示提示后退出
 */
function lock_file_guard()
{
	$this_script = __FILE__;
	if (file_exists($this_script . ".lock")) {
?>
		为了安全，本文件每次运行成功后会被自动锁定，如果想再次运行，请删除 dl.php.lock 后重试。
	<?php
		exit(0);
	}
}

/**
 * 创建锁定文件
 */
function make_lock_file()
{
	$thisscript = __FILE__;
	file_put_contents($thisscript . ".lock", "locked");
}

//endregion

//region 镜像相关
/**
 * 检查是否是镜像，如果是镜像，返回镜像版本
 * @return bool|false|string
 */
function check_image()
{
	$parent_dir = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..');
	$file = $parent_dir . "/.dzq-image";
	if (!file_exists($file)) return FALSE;
	return file_get_contents($file);
}

/**
 * 镜像欢迎页面
 */
function image_welcome()
{
	$parsed = parse_url(get_server_url());
	$url = $parsed['scheme'] . "://" . $parsed['host'] . ':8888';
	?>
	<div class="jumbotron">
		<h1 class="display-4">欢迎使用Discuz! Q官方镜像</h1>
		<p class="lead">本程序将帮助你安装或升级到Discuz! Q的最新版本</p>
		<hr class="my-4">
		<ul>
			<li>本镜像基于CentOS和宝塔，您可以登录服务器，输入<tt>dzqinfo</tt>命令，查看默认安装的Discuz! Q与宝塔的登录信息</li>
			<li>如果宝塔无法访问，请检查自己的<a href="https://console.cloud.tencent.com/cvm/securitygroup" target="_blank">安全组设置</a></li>
			<li>宝塔中已经安装并配置了MySQL 5.7和Nginx</li>
			<li>MySQL已经建立了一个名为discuz的数据库，用户名也是discuz，密码请在宝塔中查看</li>
		</ul>
	</div>
<?php
}

//endregion

//region 检查系统环境

function check_env()
{
	global $LANG;
	$env_check = array(
		'php_version' => true,
		'https' => true
	);

	$LANG['php_version'] = 'PHP版本要求 7.2以上';
	if (version_compare(phpversion(), '7.2.0', '<')) {
		$env_check['php_version'] = false;
	}

	$ext_check = extension_check();
	$env_check = array_merge($env_check, $ext_check);

	$func_check = function_check();
	$env_check = array_merge($env_check, $func_check);

	$ssl_check = check_ssl_certificate();
	$env_check = array_merge($env_check, $ssl_check);

	$LANG['https'] = '站点推荐使用HTTPS';
	if (!is_https()) {
		$env_check['https'] = 'warn';
	}

	return $env_check;
}

/**
 * 检查能否正确连接ssl网站
 */
function check_ssl_certificate()
{
	global $LANG;
	$LANG['ssl_certificate'] = 'CA根证书库检查 <a href="https://discuz.com/docs/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html#windows%E4%B8%8B%E6%8F%90%E7%A4%BA-ca-%E6%A0%B9%E8%AF%81%E4%B9%A6%E5%BA%93%E9%94%99%E8%AF%AF%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3" target="_blank">处理方案</a>';
	$LANG['download_test'] = '下载外部文件';
	$ssl_check = array();
	$url_to_check = 'https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/upgrade.txt';
	try {
		http_download_to_str($url_to_check);
	} catch (Exception $e) {
		if (strpos($e->getMessage(), "code(60)") || strpos($e->getMessage(), "code(77)")) {
			$ssl_check['ssl_certificate'] = false;
		} else {
			$ssl_check['download_test'] = false;
		}
	}
	return $ssl_check;
}


/**
 * 检查扩展模块是否加载，并生成$LANG相关文字
 */
function extension_check()
{
	global $LANG;
	$ext_check = array();
	$needed_extensions = array(
		'bcmath', 'ctype', 'curl', 'dom', 'fileinfo', 'gd', 'json', 'mbstring', 'exif', 'openssl', 'pdo', 'pdo_mysql', 'tokenizer', 'xml', 'zip'
	);

	$all_passed = true;
	foreach ($needed_extensions as $ext) {
		if (!extension_loaded($ext)) {
			$all_passed = false;
			$ext_check['extension_' . $ext] = false;
			$LANG['extension_' . $ext] = "PHP扩展要求支持 " . $ext;
		}
	}
	if ($all_passed) {
		$ext_check['extension_all'] = true;
		$LANG['extension_all'] = "PHP扩展检查";
	}

	return $ext_check;
}

/**
 * 检查函数是否正常。包括函数是否启用，ssl相关函数能否正确生成公钥/私钥
 */
function function_check()
{
	global $LANG;
	$func_check = array();
	$needed_functions = array(
		'symlink', 'readlink', 'putenv', 'realpath', 'shell_exec'
	);
	$shellMsg = '<a href="https://discuz.com/docs/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html" target="_blank">处理方案</a>';

	$all_passed = true;
	foreach ($needed_functions as $func) {
		if (!function_exists($func)) {
			$all_passed = false;
			$func_check['function_' . $func] = false;
			$LANG['function_' . $func] = "PHP函数要求启用 " . $func;
			if($func == 'shell_exec') {
				$LANG['function_' . $func] = "PHP函数要求启用 " . $func.$shellMsg;
			}
		}
	}
	if ($all_passed) {
		$func_check['function_all'] = true;
		$LANG['function_all'] = "PHP函数检查";
	}

	$LANG['function_openssl_pkey_new'] = 'PHP函数openssl生成密钥测试 <a href="https://discuz.com/docs/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html#windows%E4%B8%8B%E6%8F%90%E7%A4%BA-ssl-%E7%9B%B8%E5%85%B3%E5%87%BD%E6%95%B0%E4%B8%8D%E5%8F%AF%E7%94%A8%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3" target="_blank">处理方案</a>';
	$LANG['function_openssl_pkey_export'] = 'PHP函数openssl导出密钥测试 <a href="https://discuz.com/docs/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html#windows%E4%B8%8B%E6%8F%90%E7%A4%BA-ssl-%E7%9B%B8%E5%85%B3%E5%87%BD%E6%95%B0%E4%B8%8D%E5%8F%AF%E7%94%A8%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3" target="_blank">处理方案</a>';
	$pkey = FALSE;
	function_exists('openssl_pkey_new') && $pkey = openssl_pkey_new(['private_key_bits' => 2048]);
	if ($pkey === FALSE) {
		$func_check['function_openssl_pkey_new'] = false;
		$func_check['function_openssl_pkey_export'] = false;
	} else {
		if (!openssl_pkey_export($pkey, $pkeyout)) {
			$func_check['function_openssl_pkey_export'] = false;
		};
	}

	return $func_check;
}

function check_env_and_extension()
{
	global $LANG;
	$env_check = check_env();
	$check_all = true;
?>
	<div class="jumbotron">
		<h1 class="display-4">欢迎使用Discuz! Q安装/升级向导</h1>
		<p class="lead">本程序将帮助你安装或升级到Discuz! Q的最新版本</p>
		<hr class="my-4">
		<ul>
			<li>本程序运行过程中的提示都很重要，请一定认真阅读</li>
			<li>请先配置好服务器的域名和SSL等，使用用户要访问的域名来访问本安装程序。</li>
			<li>本程序<b>不能自动完成</b>HTTP服务器的配置，数据库的安装配置。</li>
			<li>Discuz! Q要求数据库是MySQL 5.7及以上，MariaDB 10.2及以上</li>
		</ul>
	</div>
	<div class="alert alert-primary" role="alert">
		基础环境检查
	</div>
	<ul class="list-group my-3">
		<?php foreach ($env_check as $chk => $result) {
			if (!$result) $check_all = false;
		?>
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<div> <?= $LANG[$chk] ?> </div>
				<?php if ($result === 'warn') { ?>
					<span class="badge badge-warning">警告</span>
				<?php } else if ($result) { ?>
					<span class="badge badge-primary">成功</span>
				<?php } else { ?>
					<span class="badge badge-danger">失败</span>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>
<?php
	if (!$check_all) throw new Exception('环境检查失败，请按要求确认PHP版本，启用PHP扩展与函数。');
}

//endregion

//region 检查目录结构
function pre_check()
{
	global $SCRIPT_NAME;
	$pre_check = array(
		'base_name' => true,
		'dir_name' => true,
		'base_writable' => true,
		'parent_writable' => true
	);
	$LANG = array();
	$check_all = true;

	$dir = __DIR__;
	$base_name = basename($dir);
	$LANG['base_name'] = "检查当前目录 $dir 目录名称是否为 public";
	if ($base_name !== 'public') {
		$pre_check['base_name'] = false;
	}

	$dir_name = dirname($dir);
	$LANG['dir_name'] = "检查上级目录 $dir_name 不能为根目录";
	if (!$dir_name || $dir_name === "/" || preg_match("/^[a-z|A-Z]:[\/|\\\]?$/m", $dir_name)) {
		$pre_check['dir_name'] = false;
	}

	$LANG['base_writable'] = "检查当前目录 $dir 是否可写";
	if (!writable_check($dir)) {
		$pre_check['base_writable'] = false;
	}

	$LANG['parent_writable'] = "检查上级目录 $dir_name 是否可写";
	if (!writable_check($dir_name)) {
		$pre_check['parent_writable'] = false;
	}
?>
	<div class="alert alert-primary" role="alert">
		<h2>安装目录检查</h2>
	</div>
	<p> 在安装之前，请在网站的主目录下建立一个 public 子目录，将本文件放在 public 下。创建完的目录结构类似于： </p>
	<pre>
  /wwwroot
    └── discuz
      └── public
        └──<?= $SCRIPT_NAME ?>
	</pre>
	<p>
		然后请阅读<a href="https://discuz.com/docs/" target="_blank">安装文档</a>，配置好Web服务器，
		将Web服务器的根目录或运行目录指向刚刚建立的 public 目录。
	</p>
	<p>
		Discuz! Q运行时，需要能<u>读写 public 目录和 public 的上级目录</u>，下面是相关的检查。
	</p>
	<p>
		如果使用宝塔，并且这里检查不通过，请设置 <u>网站目录 指向 网站主目录(比如上面例子中的discuz)，设置 运行目录 为 /public。</u> 如果已经这样设置了，但还是检查失败，请删除 <?= $dir ?> 和 <?= $dir_name ?> 中的 .user.ini文件，再重试。
	</p>
	<p>
		如果你使用其它的PHP集成产品，并且这里检查不通过，请确认 <u>跨站攻击、php.ini中open_basedir配置、其它配置文件(.user.ini, fcgi配置文件等)中的open_basedir</u> 是否限制了对网站主目录的访问。
	</p>
	<ul class="list-group my-3">
		<?php foreach ($pre_check as $chk => $result) {
			if (!$result) $check_all = false;
		?>
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<?= $LANG[$chk] ?>
				<?php if ($result === 'warn') { ?>
					<span class="badge badge-warning">警告</span>
				<?php } else if ($result) { ?>
					<span class="badge badge-primary">成功</span>
				<?php } else { ?>
					<span class="badge badge-danger">失败</span>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>
	<?php
	if (!$check_all) {
		$obd = ini_get('open_basedir');
		throw new Exception("预检查失败，请修复以上失败的检查后重试。当前系统配置的open_basedir值为：" . $obd . "，请按上面的文档进行相关检查，并确保open_basedir中包含：<strong>" . $dir . " 和 " . $dir_name . "</strong>。修改配置后可能要重启php服务。");
	}
	?>
	<div class="alert alert-success" role="alert">
		<p>安装目录检查成功。</p>
		<p>当前目录 <?= $dir ?></p>
		<?php if ($ver = existing_installation()) { ?>
			<p>存在Discuz! Q <?= $ver ?>，接下来将进行升级</p>
		<?php } else { ?>
			<p>Discuz! Q将被安装到 <?= $dir_name ?></p>
		<?php } ?>
	</div>
<?php
	auto_next_step();
}

//endregion

//region 用户选择版本

function download_package()
{
	global $STEP, $SCRIPT_NAME;
	$packages = download_json(PACKAGE_BASE . "packages.json");
	if (!isset($packages->includes)) {
		throw new Exception("元数据解析错误");
	}
	$detail_url_array = array_keys(get_object_vars($packages->includes));
	if (sizeof($detail_url_array) != 1) {
		throw new Exception("元数据内容错误");
	}
	$detail_url = PACKAGE_BASE . $detail_url_array[0];

	$detail_packages = download_json($detail_url);
	if (!isset($detail_packages->packages)) {
		throw new Exception("详细元数据解析错误");
	}
	$detail_packages = $detail_packages->packages;
	if (!isset($detail_packages->{'qcloud/discuz'})) {
		throw new Exception("详细元数据无法获取qcloud/discuz");
	}
	$discuz = $detail_packages->{'qcloud/discuz'};
	$versions = array_keys(get_object_vars($discuz));
	$versions = array_diff($versions, array("dev-master"));
	$versions = array_filter($versions, function ($ver) {
		return version_compare($ver, "v1.0.200101", ">");
	});

	usort($versions, 'version_compare');
?>
	<div class="alert alert-primary" role="alert">
		<p>下载主程序</p>
	</div>
	<p>请选择计划安装的版本</p>
	<form action="/<?= $SCRIPT_NAME ?>" method="get" class="mx-2" id="userform">
		<input type="hidden" name="step" value="<?= $STEP + 1 ?>">
		<?php foreach ($versions as $i => $ver) {
			if (!isset($discuz->{$ver}->dist)) continue;
			$tmp = explode('/', $discuz->{$ver}->dist->url);
			$url = urlencode(end($tmp));
		?>
			<div class="form-check my-2">
				<input class="form-check-input" type="radio" name="ver" id="versions_select_<?= $i ?>" value="<?= $url ?>" <?= $i === sizeof($versions) - 1 ? 'checked' : '' ?>>
				<label class="form-check-label" for="versions_select_<?= $i ?>">
					<?= $ver ?>
				</label>
			</div>
		<?php } ?>
		<?php if (existing_installation()) { ?>
			<div class="form-check">
				<input type="checkbox" class="form-check-input" id="check-overwrite" name="overwrite" value="true" checked>
				<label class="form-check-label" for="check-overwrite">升级前删除原来的静态文件目录( public/static, public/static-admin )</label>
			</div>
		<?php } ?>
		<br />
	</form>
	<div class="alert alert-success" role="alert">
		接下来将会下载Discuz! Q的主程序，点击下一步后请耐心等待。
	</div>

<?php
}

//endregion

//region 下载主程序

function download_dzq_main()
{
	global $STEP, $SCRIPT_NAME;
	$target_dir = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..');

	$version = get_var('ver');

	check_version_to_download($version);

	if (get_var('overwrite')) {
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'static'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'static-admin'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . '_nuxt'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'pc-pages'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'pc-topic'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'invite'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'manage'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'modify'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'my'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'site'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'thread'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'topic'));
		remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . 'user'));
		
	}

	$url = PACKAGE_BASE . 'dist/qcloud/discuz/' . $version;

	$tmpfile = __DIR__ . DIRECTORY_SEPARATOR . uniqid('dzq', true) . '.zip';
	download_as_file_with_auth($url, false, false, $tmpfile);

	extract_zip($tmpfile, $target_dir);

	unlink($tmpfile);
?>
	<div class="alert alert-primary" role="alert">
		主程序下载完成
	</div>
	<div class="alert alert-success" role="alert">
		Discuz! Q主程序已经下载完成并解压缩到 <?= $target_dir ?> ，下一步将下载Discuz! Q的支持包，文件较大，请耐心等待。
	</div>
	<form action="/<?= $SCRIPT_NAME ?>" method="get" class="mx-2" id="userform">
		<input type="hidden" name="step" value="<?= $STEP + 1 ?>">
		<input type="hidden" name="ver" value="<?= $version ?>">
	</form>
<?php
	auto_next_step();
}

function check_version_to_download($versioned_zip)
{
	$old_version = existing_installation();
	if ($old_version) {
		$ver = get_version_from_versioned_zip($versioned_zip);
		if (version_compare($ver, $old_version, "<")) {
			throw new Exception("您选择下载的版本号(${ver})小于当前安装版本号 ${old_version} ，无法继续。");
		}
	}
}

//endregion

//region 下载Vendor
function download_vendor()
{
	$target_dir = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..');
	if (!file_exists($target_dir)) { //TODO: 正确检查主程序是否下载成功
		throw new Exception("主程序还未下载成功，请返回上一步");
	}
	$ver = get_version_from_versioned_zip(get_var('ver'));

	$url = "https://dl.discuz.chat/offline/v$ver.zip";
	$tmpfile = __DIR__ . "/" . uniqid('vendor', true) . '.zip';
	download_as_file_with_auth($url, false, false, $tmpfile);
	remove_dir(realpath(__DIR__ . PATH_SEPARATOR . "../vendor"));
	extract_zip($tmpfile, $target_dir);
	unlink($tmpfile);
?>
	<div class="alert alert-primary" role="alert">
		代码下载完成
	</div>
	<div class="alert alert-success" role="alert">
		<p>Discuz! Q的所有文件已经下载完成并解压缩到 <?= $target_dir ?> 。</p>
		<?php if (existing_installation()) {
		?>
			<p>最新版的代码已经更新完成，下一步进入升级程序。</p>
		<?php } ?>
	</div>
<?php
	auto_next_step();
}

//endregion

//region 检查软连接
function check_symlink()
{
?>
	<div class="alert alert-primary" role="alert">
		检查软连接
	</div>
	<?php
	$public_dir = realpath(__DIR__);
	$storage_dir = realpath(dirname(__DIR__) . "/storage/app/public");
	if (!file_exists($storage_dir)) {
		throw new Exception("$storage_dir 不存在，请返回第一步重新下载安装");
	}
	$public_storage = $public_dir . DIRECTORY_SEPARATOR . "storage";
	if (file_exists($public_storage)) {
		if (!(is_link($public_storage) && readlink($public_storage) == $storage_dir)) {
			throw new Exception("$public_storage 已存在，并且指向不正确，请删除后，再重试本步骤");
		}
	} else {
		if (is_link($public_storage)) {
			throw new Exception("$public_storage 已存在，并且指向不存在的目录，请删除后，再重试本步骤");
		}
		if (symlink($storage_dir, $public_storage) === false) {
			if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
				throw new Exception("<p>建立软连接失败，请在服务器上以管理员身份打开命令提示符，运行</p><pre class=\"pre-logs\">mklink /d $public_storage $storage_dir</pre><p>然后重试本步骤</p>");
			} else {
				throw new Exception("<p>建立软连接失败，请在服务器上运行</p><pre class=\"pre-logs\">ln -s $storage_dir $public_storage</pre><p>然后，重试本步骤</p>");
			}
		}
	}
	?>
	<div class="alert alert-success" role="alert">
		软连接已经建立成功，<?= $public_storage ?> 指向 <?= $storage_dir ?>
	</div>
<?php
	auto_next_step();
}

//endregion

//region 检查/install /api /index.html的配置是否正确
function check_httpd_config()
{
	$base_url = get_server_url();
	$check_all = true;
	$url_check = array(
		'install_url' => true,
		'index_url1' => true,
		'index_url2' => true,
		'api_url' => true
	);
	$LANG = array();

	try {
		$install_path = $base_url . "/install";
		$LANG['install_url'] = "访问 $install_path 测试";
		$install_str = http_download_to_str($base_url . "/install", true);
		if ($install_str === FALSE || !preg_match("/adminUsername/m", $install_str)) {
			$url_check['install_url'] = false;
		}
	} catch (Exception $e) {
		$url_check['install_url'] = false;
	}

	try {
		$index_path = $base_url;
		$LANG['index_url1'] = "访问 $index_path 测试";
		$index_str = http_download_to_str($index_path, true);
		if ($index_str === FALSE || (!preg_match("/from=pc/m", $index_str) && !preg_match("/_nuxt/m", $index_str))) {
			$url_check['index_url1'] = false;
		}
	} catch (Exception $e) {
		$url_check['index_url1'] = false;
	}

	try {
		$index_path = $base_url . "/notexists";
		$LANG['index_url2'] = "访问 $index_path 测试";
		$index_str = http_download_to_str($index_path, true);
		if ($index_str === FALSE || (!preg_match("/from=pc/m", $index_str) && !preg_match("/_nuxt/m", $index_str))) {
			$url_check['index_url2'] = false;
		}
	} catch (Exception $e) {
		$url_check['index_url2'] = false;
	}


	try {
		$api_path = $base_url . "/api";
		$LANG['api_url'] = "访问 $api_path 测试";
		$api_str = http_download_to_str($api_path, true);
		if (json_decode($api_str) === NULL) {
			$url_check['api_url'] = false;
		}
	} catch (Exception $e) {
		$url_check['api_url'] = false;
	}

?>
	<div class="alert alert-primary" role="alert">
		HTTP服务器配置检查
		<p>请参考 <a href="https://discuz.com/docs/"> 服务器配置文档 </a> 对Web服务器进行配置。
	</div>
	<ul class="list-group my-3">
		<?php foreach ($url_check as $chk => $result) {
			if (!$result) $check_all = false;
		?>
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<?= $LANG[$chk] ?>
				<?php if ($result === 'warn') { ?>
					<span class="badge badge-warning">警告</span>
				<?php } else if ($result) { ?>
					<span class="badge badge-success">成功</span>
				<?php } else { ?>
					<span class="badge badge-danger">失败</span>
				<?php } ?>
			</li>
		<?php } ?>
	</ul>
	<?php
	if (!$check_all) {
		throw new Exception("HTTP服务器配置检查错误。如果使用Nginx，请对照文档检查配置；如果使用Apache，请检查mod_rewrite是否生效；如果使用IIS，请安装URL Rewrite并导入.htaccess规则。");
	} else {
	?>
		<p>所有准备工作都已完成，接下来进入Discuz! Q的初始化程序，进行系统初始化。请确认自己的数据库是MySQL 5.7及以上，MariaDB 10.2及以上，点击下一步。</p>
	<?php
		auto_next_step();
	}
}

//endregion

//region Discuz! Q初始化输入信息

function show_init_form()
{
	global $SCRIPT_NAME, $STEP;

	// $action == 1 表示是提交的表单
	$action = get_var('action');

	$forumTitle = get_var('forumTitle');
	$mysqlHost = get_var('mysqlHost');
	$mysqlDatabase = get_var('mysqlDatabase');
	$mysqlUsername = get_var('mysqlUsername');
	$mysqlPassword = get_var('mysqlPassword');
	$tablePrefix = get_var('tablePrefix');
	$adminUsername = get_var('adminUsername');
	$adminPassword = get_var('adminPassword');
	$adminPasswordConfirmation = get_var('adminPasswordConfirmation');

	// 判断每个字段是否合法
	$forumTitleInvalid = $action && !$forumTitle;
	$mysqlHostInvalid = $action && !$mysqlHost;
	$mysqlDatabaseInvalid = $action && !$mysqlDatabase;
	$mysqlUsernameInvalid = $action && !$mysqlUsername;
	$mysqlPasswordInvalid = $action && !$mysqlPassword;
	$tablePrefixInvalid = $action && $tablePrefix && !preg_match("/^\w+$/", $tablePrefix);
	$adminUsernameInvalid = $action && !$adminUsername;
	$adminPasswordInvalid = $action && (!$adminPassword || !$adminPasswordConfirmation || ($adminPasswordConfirmation != $adminPassword));

	// 需要检查数据库连接
	$mysqlConnectCheck = $action && !$mysqlHostInvalid && !$mysqlUsernameInvalid && !$mysqlPasswordInvalid;

	$mysqlVersionInvalid = true;
	$mysqlConnectInvalid = true;
	$mysqlUserPassInvalid = true;
	$mysqlDatabaseDbInvalid = true;
	$mysqlDatabaseDbInvalidMsg = "";
	$mysqlVersionInvalidMsg = "";

	if ($mysqlConnectCheck) {
		$r = check_mysql_connection($mysqlHost, $mysqlUsername, $mysqlPassword);
		$mysqlConnectInvalid = ($r === -1) || $r === false;
		$mysqlUserPassInvalid = ($r === -2);
		$mysqlHostInvalid = $mysqlHostInvalid || $mysqlConnectInvalid;

		if ($mysqlUserPassInvalid) {
			$mysqlUsernameInvalid = true;
			$mysqlPasswordInvalid = true;
		}

		if (!$mysqlConnectInvalid && !$mysqlUserPassInvalid) { // 如果数据库可连接
			$r = check_mysql_version($mysqlHost, $mysqlUsername, $mysqlPassword);
			if ($r !== true) { // 如果数据库版本错误，也标记mysqlHost字段不合法
				$mysqlHostInvalid = true;
				$mysqlVersionInvalid = true;
				$mysqlVersionInvalidMsg = $r;
			} else {
				$mysqlVersionInvalid = false;
			}
			if (!$mysqlDatabaseInvalid) { // 如果输入了数据库名称
				$r = check_mysql_database($mysqlHost, $mysqlUsername, $mysqlPassword, $mysqlDatabase);
				if ($r !== true) {
					$mysqlDatabaseInvalid = true;
					$mysqlDatabaseDbInvalidMsg = $r;
					$mysqlDatabaseDbInvalid = true;
				}
			}
		}
	}

	if (strpos($mysqlDatabase, '-') !== false) {
		$mysqlDatabaseInvalid = true;
		$mysqlDatabaseDbInvalidMsg = "数据库名称中不能包含 - ";
	}

	$ready_to_install = $action && !$forumTitleInvalid && !$mysqlHostInvalid && !$mysqlDatabaseInvalid && !$mysqlUsernameInvalid
		&& !$mysqlPasswordInvalid && !$tablePrefixInvalid && !$adminUsernameInvalid && !$adminPasswordInvalid && !$mysqlUserPassInvalid;

	if ($ready_to_install) {
		if (has_mysql_init_sql()) {
			// 如果有初始化sql，则进入下一步，由本程序进行初始化，不通过POST到 http://localhost/install 进行初始化
			$STEP += 1;
			$ready_to_install = 0;
		} else {
			make_lock_file();
		}
		auto_next_step();
	?>
		<div class="alert alert-success" role="alert">
			<p>Discuz! Q 完成安装</p>
			<p>所有测试都已完成，将自动完成安装 ！</p>
		</div>
		<div class="alert alert-danger hidden" id="errormsgdiv" role="alert">
			<p>安装错误</p>
			<p id="errormsg"></p>
		</div>
	<?php } else { ?>
		<div class="alert alert-primary" role="alert">
			<p>Discuz! Q 初始化</p>
			<p>请填写以下信息，点击下一步测试是否可安装</p>
		</div>
	<?php } ?>
	<form action="<?= $SCRIPT_NAME ?>?step=<?= $STEP ?>" method="post" id="userform<?= $ready_to_install ? 'install' : '' ?>">
		<input type="hidden" name="action" value="1" />
		<div class="form-group row">
			<label for="forum_title" class="col-sm-2 offset-sm-2 col-form-label">站点名称</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $forumTitleInvalid ? "is-invalid" : "" ?>" id="forum_title" name="forumTitle" value="<?= $forumTitle ?>" required>
				<?php if ($action && !$forumTitle) { ?>
					<div class="invalid-feedback">站点名称不能为空</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="mysql_host" class="col-sm-2 offset-sm-2 col-form-label">MySQL 服务器地址</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $mysqlHostInvalid ? "is-invalid" : "" ?>" id="mysql_host" name="mysqlHost" value="<?= $mysqlHost ? $mysqlHost : "127.0.0.1" ?>" required>
				<?php if ($action && !$mysqlHost) { ?>
					<div class="invalid-feedback">MySQL 服务器不能为空</div>
				<?php } ?>
				<?php if ($mysqlConnectCheck && $mysqlConnectInvalid) { ?>
					<div class="invalid-feedback">MySQL 服务器无法连接，请检查服务器的IP与端口(可用:指定端口号)</div>
				<?php } ?>
				<?php if ($mysqlConnectCheck && $mysqlVersionInvalid) { ?>
					<div class="invalid-feedback"><?= $mysqlVersionInvalidMsg ?></div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="mysql_database" class="col-sm-2 offset-sm-2 col-form-label">数据库名称</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $mysqlDatabaseInvalid ? "is-invalid" : "" ?>" id="mysql_database" name="mysqlDatabase" value="<?= $mysqlDatabase ?>" required>
				<?php if ($action && !$mysqlDatabase) { ?>
					<div class="invalid-feedback">数据库名称不能为空</div>
				<?php } else if ($action && $mysqlDatabaseDbInvalid) { ?>
					<div class="invalid-feedback"><?= $mysqlDatabaseDbInvalidMsg ?></div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="mysql_username" class="col-sm-2 offset-sm-2 col-form-label">MySQL 用户名</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $mysqlUsernameInvalid ? "is-invalid" : "" ?>" id="mysql_username" name="mysqlUsername" value="<?= $mysqlUsername ?>" required>
				<?php if ($action && !$mysqlUsername) { ?>
					<div class="invalid-feedback">MySQL 用户名不能为空</div>
				<?php } ?>
				<?php if ($action && $mysqlUserPassInvalid) { ?>
					<div class="invalid-feedback">使用您输入的 MySQL 用户名密码组合无法连接到数据库</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="mysql_password" class="col-sm-2 offset-sm-2 col-form-label">MySQL 密码</label>
			<div class="col-sm-6">
				<input type="password" class="form-control <?= $mysqlPasswordInvalid ? "is-invalid" : "" ?>" id="mysql_password" name="mysqlPassword" value="<?= $mysqlPassword ?>" required>
				<?php if ($action && !$mysqlPassword) { ?>
					<div class="invalid-feedback">MySQL 密码不能为空</div>
				<?php } ?>
				<?php if ($action && $mysqlUserPassInvalid) { ?>
					<div class="invalid-feedback">使用您输入的 MySQL 用户名密码组合无法连接到数据库</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="table_prefix" class="col-sm-2 offset-sm-2 col-form-label">表前缀(可选)</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $tablePrefixInvalid ? "is-invalid" : "" ?>" id="table_prefix" name="tablePrefix" value="<?= $tablePrefix ?>" required>
				<?php if ($action && $tablePrefixInvalid) { ?>
					<div class="invalid-feedback">表前缀含有不合法字符</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="admin_username" class="col-sm-2 offset-sm-2 col-form-label">设置管理员用户名</label>
			<div class="col-sm-6">
				<input type="text" class="form-control <?= $adminUsernameInvalid ? "is-invalid" : "" ?>" id="admin_username" name="adminUsername" value="<?= $adminUsername ?>" required>
				<?php if ($action && !$adminUsername) { ?>
					<div class="invalid-feedback">管理员用户名不能为空</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="admin_password" class="col-sm-2 offset-sm-2 col-form-label">设置管理员密码</label>
			<div class="col-sm-6">
				<input type="password" class="form-control <?= $adminPasswordInvalid ? "is-invalid" : "" ?>" id="admin_password" name="adminPassword" value="<?= $adminPassword ?>" required>
				<?php if ($action && !$adminPassword) { ?>
					<div class="invalid-feedback">管理员密码不能为空</div>
				<?php } else if ($action && ($adminPassword != $adminPasswordConfirmation)) { ?>
					<div class="invalid-feedback">管理员密码两次输入不一致</div>
				<?php } ?>
			</div>
		</div>
		<div class="form-group row">
			<label for="admin_password2" class="col-sm-2 offset-sm-2 col-form-label">管理员密码确认</label>
			<div class="col-sm-6">
				<input type="password" class="form-control <?= $adminPasswordInvalid ? "is-invalid" : "" ?>" id="admin_password2" name="adminPasswordConfirmation" value="<?= $adminPasswordConfirmation ?>" required>
				<?php if ($action && !$adminPasswordConfirmation) { ?>
					<div class="invalid-feedback">管理员密码确认不能为空</div>
				<?php } else if ($action && ($adminPassword != $adminPasswordConfirmation)) { ?>
					<div class="invalid-feedback">管理员密码两次输入不一致</div>
				<?php } ?>
			</div>
		</div>
	</form>
<?php
}

//endregion

//region Discuz! Q初始化

function init_dzq()
{
	$forumTitle = get_var('forumTitle');
	$mysqlHost = get_var('mysqlHost');
	$mysqlDatabase = get_var('mysqlDatabase');
	$mysqlUsername = get_var('mysqlUsername');
	$mysqlPassword = get_var('mysqlPassword');
	$tablePrefix = get_var('tablePrefix');
	$adminUsername = get_var('adminUsername');
	$adminPassword = get_var('adminPassword');
	
	$version = extract_version_from_source();
	$logs = "开始安装... \n";
	$logs .= "数据库服务器 ${mysqlHost} \n";

	$dzq_path = dirname(__DIR__);

	require $dzq_path . '/vendor/autoload.php';
	
	$logs .= "Discuz! Q主目录 ${dzq_path} \n";
	$app = new Discuz\Foundation\Application($dzq_path);
	$siteApp = new Discuz\Foundation\SiteApp($app);
	$siteApp->siteBoot();

	$logs .= drop_config_file($app);
	$logs .= install_database($app, $mysqlHost, $mysqlUsername, $mysqlPassword, $tablePrefix, $mysqlDatabase);
	$logs .= install_config($app, $mysqlHost, $mysqlUsername, $mysqlPassword, $tablePrefix, $mysqlDatabase);
	$logs .= install_key_and_cert_generate($app);
	$logs .= run_db_script($app, $mysqlDatabase, $tablePrefix);
	$logs .= update_settings($app, $forumTitle);
	$logs .= update_admin_user($adminUsername, $adminPassword);
	$logs .= cloud_report($app, get_server_url());
	touch($app->storagePath() . '/install.lock');
	make_lock_file();

?>
	<h2>Discuz! Q <?= $version ?> 安装成功</h2>
	<p>安装日志：</p>
	<pre class="pre-logs"><?= $logs ?></pre>
	<p>点击下一步完成安装</p>
	<form action="<?= htmlspecialchars(get_server_url()); ?>" method="get" class="mx-2" id="userform">
	</form>
<?php
}

function drop_config_file($app)
{
	$configFile = $app->basePath('config/config.php');
	file_exists($configFile) && unlink($configFile);
	return "配置文件 ${configFile} \n";
}

function install_database($app, $host, $username, $password, $prefix, $database)
{
	$port = 3306;
	$mysqlConfig = [
		'driver' => 'mysql',
		'host' => $host,
		'port' => $port,
		'database' => '',
		'username' => $username,
		'password' => $password,
		'charset' => 'utf8mb4',
		'collation' => 'utf8mb4_unicode_ci',
		'prefix' => $prefix,
		'prefix_indexes' => true,
		'strict' => true,
		'engine' => 'InnoDB',
		'options' => extension_loaded('pdo_mysql') ? array_filter([
			PDO::MYSQL_ATTR_SSL_CA => '',
		]) : [],
	];
	$db = $app->make('db');
	$app['config']->set(
		'database.connections',
		[
			'mysql' => $mysqlConfig
		]
	);

	$pdo = $db->connection('mysql')->getPdo();
	$sql = sprintf('CREATE DATABASE IF NOT EXISTS `%s`  DEFAULT CHARACTER SET = `utf8mb4` DEFAULT COLLATE = `utf8mb4_unicode_ci`', $database);
	$pdo->query($sql)->execute();

	$app['config']->set(
		'database.connections',
		[
			'mysql' => array_merge($mysqlConfig, [
				'database' => $database,
			])
		]
	);
	$db->purge('mysql');
	$db->connection('mysql');
	return "创建数据库 ${database} ... 完成 \n";
}

function install_config($app, $host, $username, $password, $prefix, $database)
{
	$port = 3306;

	$defaultConfig = file_get_contents($app->configPath('config_default.php'));

	if (Illuminate\Support\Str::contains($host, ':')) {
		list($host, $port) = explode(':', $host, 2);
	}

	$stub = str_replace([
		'DummyDbHost',
		'DummyDbPort',
		'DummyDbDatabase',
		'DummyDbUsername',
		'DummyDbPassword',
		'DummyDbPrefix',
	], [
		$host,
		$port,
		$database,
		$username,
		$password,
		$prefix,
	], $defaultConfig);

	file_put_contents($app->configPath('config.php'), $stub);
	return "配置文件创建 ... 完成 \n";
}

function install_key_and_cert_generate($app)
{
	$input = new Symfony\Component\Console\Input\ArrayInput([]);
	$output = new Symfony\Component\Console\Output\BufferedOutput();
	//站点唯一key
	$app->make(App\Console\Commands\KeyGenerate::class)->run($input, $output);
	//证书
	$app->make(App\Console\Commands\RsaCertGenerate::class)->run($input, $output);
	return "生成新的站点密钥 ... 成功 \n";
}

function run_db_script($app, $database, $prefix)
{
	$sqlfile = $app->databasePath() . "/init_mysql.sql";
	$sql = file_get_contents($sqlfile);
	$sql = str_replace('dzqdatabase_placeholder', $database, $sql);
	$sql = str_replace('ppre_', $prefix, $sql);
	$db = $app->make('db');
	$pdo = $db->connection('mysql')->getPdo();
	$pdo->exec($sql);
	return "执行数据库初始化脚本 ... 成功 \n";
}

function update_settings($app, $title)
{
	$setting = $app->make(App\Settings\SettingsRepository::class);
	$setting->set('site_name', $title);
	$setting->set('site_install', Illuminate\Support\Carbon::now());
	return "更新站点设置 ... 完成  \n";
}

function update_admin_user($username, $password)
{
	$user = App\Models\User::find(1);
	$user->username = $username;
	$user->password = $password;
	$user->created_at = date('Y-m-d H:i:s');
	$user->save();
	return "管理员用户创建 ... 完成  \n";
}

function cloud_report($app, $url)
{
	$log = "生成站点ID ... ";
	$config = [
		'base_uri' => 'https://cloud.discuz.chat/api/',
		'timeout'  =>  15
	];
	try {
		$client = new GuzzleHttp\Client($config);
		$client->requestAsync('POST', 'cloud/register', [
			'json' => ['url' => $url]
		])->then(function (Psr\Http\Message\ResponseInterface $response) use ($app, $log) {
			$setting = $app->make(App\Settings\SettingsRepository::class);
			$data = json_decode($response->getBody()->getContents(), true);
			$setting->set('site_id', Illuminate\Support\Arr::get($data, 'site_id'));
			$setting->set('site_secret', Illuminate\Support\Arr::get($data, 'site_secret'));
		})->wait();
	} catch (Exception $e) {
		$log .= "失败 \n";
		return $log;
	}
	$log .= "完成 \n";
	$log .= "安装完成 \n";
	return $log;
}


//endregion

//region 升级
function upgrade_existing_installation()
{
	$old_version = get_old_version();
	if ($old_version === false) {
		throw new Exception("无法获取升级前的版本号");
	}
	$new_version = existing_installation();
	if ($new_version === false) {
		throw new Exception("程序代码未下载成功");
	}
	if (version_compare($old_version, $new_version, ">")) {
		throw new Exception("无法降级到低版本");
	}

	$logs = '';

	remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . "../storage/cache/data"));
	remove_dir(realpath(__DIR__ . DIRECTORY_SEPARATOR . "../storage/formatter"));
	$logs .= "缓存清理完毕\n";

	$upgrade_url = "https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/upgrade.txt";
	$str = check_and_strip_upgrade_md5(http_download_to_str($upgrade_url));
	$releases = eval($str);
	$logs .= "版本升级文件下载并验证完成\n";
	if (!array_key_exists($new_version, $releases)) {
		$logs .= "执行默认升级操作 \n";
	}
	$versions_to_apply = array_filter($releases, function ($ver) use ($old_version, $new_version) {
		return version_compare($ver, $old_version, ">") && version_compare($ver, $new_version, "<=");
	}, ARRAY_FILTER_USE_KEY);
	//按照版本号正序排
	uksort($versions_to_apply, 'version_compare');
	//依次执行每一个版本的命令，前提保证下载的最新的包中包含所有的命令执行类文件
    //循环执行升级命令
	foreach ($versions_to_apply as $ver => $actions) {
	    //当前老版本命令不再执行
        if(!version_compare($ver, $old_version,'==')) {
            $logs .= '升级到 ' . $ver . "\n";
            $logs .= apply_version_upgrade($actions);
        }
	}
	$logs .= run_db_migration();
	//升级完成后增加锁文件
	make_lock_file();
?>
	<h2>Discuz! Q升级到 <?= $new_version ?> 成功</h2>
	<p>升级日志：</p>
	<pre class="pre-logs"><?= $logs ?></pre>
	<p>点击下一步完成安装</p>
	<form action="<?= htmlspecialchars(get_server_url()) ?>" method="get" class="mx-2" id="userform">
	</form>
	<?php
}

function apply_version_upgrade($actions)
{
	if (count($actions) === 0) return '';
	$logs = '    ';
	foreach ($actions as $type => $params) {
		$logs .= call_user_func('apply_version_upgrade_' . $type, $params);
	}
	return rtrim(str_replace("\n", "\n    ", $logs)) . "\n";
}

function apply_version_upgrade_config($params)
{
	$logs = "升级config.php文件...";
	$config_file = realpath(__DIR__ . "/../config/config.php");
	$config_str = file_get_contents($config_file);
	foreach ($params as $param) {
		$find = $param['find'];
		$replace = $param['replace'];
		$config_str = preg_replace($find, $replace, $config_str);
	}
	$logs .= "成功\n";
	$logs .= "保存config.php文件\n";
	file_put_contents($config_file, $config_str);
	return $logs;
}

function apply_version_upgrade_command($params)
{
	$logs = "";
	$logs .= run_db_migration();
	foreach ($params as $param) {
		$logs .= "执行升级命令 ${param}\n";
		$logs .= run_custom_command($param);
	}
	return $logs;
}

function apply_version_upgrade_migration($params)
{
	if (count($params) === 0) {
		return '';
	}
	$logs = '';
	try {
		return run_db_migration();
	} catch (Exception $e) {
		foreach ($params as $url) {
			$content = http_download_to_str($url);
			$file_name = basename($url);
			$logs .= "替换文件 " . $file_name . "\n";
			$target_file = __DIR__ . "/../database/migrations/" . $file_name;
			if (file_exists($target_file) && file_get_contents($target_file) === $content) {
				// 如果已经替换过，还不行，则需要抛异常
				throw $e;
			}
			file_put_contents($target_file, $content);
		}
	?>
		<script type="text/javascript">
			location.reload();
		</script>
	<?php
	}
	return $logs;
}



function check_and_strip_upgrade_md5($str)
{
	$lines = explode("\n", $str);
	openssl_public_decrypt(base64_decode($lines[0]), $md5, get_public_key());
	array_shift($lines);
	$str = implode("\n", $lines);
	if (md5($str) !== $md5) {
		throw new Exception("升级文件被篡改，请检查你的服务器是否有安全隐患");
	}
	return $str;
}

function run_db_migration()
{
	try {
		return run_console_command('migrate', ['--force' => true]);
	} catch (Exception $e) {
		throw new Exception("无法完成数据库升级，错误信息：" . $e->getMessage());
	}
}

/**
 * 运行 php disco 命令
 */
function run_console_command($cmd, $params)
{
	// 访问私有属性
	$reader = function & ($object, $property) {
		$value = &Closure::bind(function & () use ($property) {
			return $this->$property;
		}, $object, $object)->__invoke();

		return $value;
	};

	require __DIR__ . '/../vendor/autoload.php';
	$app = new Discuz\Foundation\Application(realpath(__DIR__ . '/..'));
	$console = $app->make(Discuz\Console\Kernel::class);
	$console->call($cmd, $params);
	$lastOutput = &$reader($console, 'lastOutput');
	return $lastOutput->fetch();
}

function run_custom_command($command_class)
{
	require __DIR__ . '/../vendor/autoload.php';
	$input = new Symfony\Component\Console\Input\ArrayInput([]);
	$output = new Symfony\Component\Console\Output\BufferedOutput();
	$app = new Discuz\Foundation\Application(realpath(__DIR__ . '/..'));
	$siteApp = new Discuz\Foundation\SiteApp($app);
	$siteApp->siteBoot();
	$console = $app->make($command_class);
	$console->run($input, $output);
	return $output->fetch();
}

//endregion

//region 升级自己

function silent_self_update()
{
	$dir = __DIR__;
	if (writable_check($dir)) {
		if (is_writable(__FILE__)) {
			try {
				do_self_update();
			} catch (Exception $e) {
			}
		}
	}
	auto_next_step();
}

function do_self_update()
{
	global $SELF_VERSION;
	$self_replaced = false;
	$need_upgrade = false;
	$remote_version = trim(http_download_to_str('https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/latest_dl_ver.txt'));
	if ($remote_version !== $SELF_VERSION) { // 只要不相等，就更新
		$need_upgrade = true;
		$new_file = http_download_to_str('https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/dl.php');
		$new_file_md5 = trim(http_download_to_str('https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/latest_dl_md5.txt'));
		if (md5($new_file) === $new_file_md5) {
			if (file_put_contents(__FILE__, $new_file)) {
				$self_replaced = true;
			}
		}
	}
	return array($need_upgrade, $self_replaced, $remote_version);
}

function check_self_update()
{
	global $SCRIPT_NAME;
	list($need_upgrade, $self_replaced, $remote_version) = do_self_update();
	if ($need_upgrade) {
	?>
		<div class="alert alert-primary" role="alert">
			dl.php自动更新
		</div>
		<?php
		if ($self_replaced) {
		?>
			<div class="alert alert-success" role="alert">
				本文件已更新到最新版本 <?= $remote_version ?>，下面将自动重新运行本向导。
			</div>
			<script>
				setTimeout(function() {
					window.location.href = "/<?= $SCRIPT_NAME ?>?step=0";
				}, 2000);
			</script>
		<?php
		} else {
			throw new Exception('无法自动完成dl.php升级，请检查dl.php文件的owner和权限，或手工下载 <a href="https://discuzq-docs-1258344699.cos.ap-guangzhou.myqcloud.com/dl.php">此文件</a> 后上传更新。');
		}
	} else {
		?>
		<script>
			next_step()
		</script>
	<?php
	}
}

//endregion

//region 公共函数

function get_step()
{
	return get_var('step');
}

function download_json($url)
{
	$pkg_str = http_download_to_str($url);
	if ($pkg_str === FALSE) {
		throw new Exception("下载错误: " . $url);
	}
	$json = json_decode($pkg_str);
	if ($json === NULL) throw new Exception("${pkg_str} 无法被解析成 json");
	return $json;
}

function http_download_to_str($url, $ignore_ssl_error = false)
{
	if (!function_exists('curl_init')) {
		throw new Exception("curl扩展未启用");
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');
	if ($ignore_ssl_error) {
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	} else {
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
	}

	$response = curl_exec($ch);
	if ($response === FALSE) {
		$error_no = curl_errno($ch);
		throw new Exception("下载 $url 错误，code($error_no)，错误信息：" . curl_error($ch));
	}
	curl_close($ch);
	return $response;
}

function get_var($var)
{
	if (!isset($_GET[$var])) {
		if (!isset($_POST[$var])) return false;
		$ret =  $_POST[$var];
	} else {
		$ret = $_GET[$var];
	}
	return htmlspecialchars($ret);
}

function redirect($url)
{
	header('Location: ' . $url);
	exit(0);
}

function is_https()
{
	if (isset($_SERVER["HTTPS"]) && strtolower($_SERVER["HTTPS"]) != "off") {
		return true;
	}
	if (isset($_SERVER["HTTP_X_FORWARDED_PROTO"]) && strtolower($_SERVER["HTTP_X_FORWARDED_PROTO"]) == "https") {
		return true;
	}
	if (isset($_SERVER["HTTP_SCHEME"]) && strtolower($_SERVER["HTTP_SCHEME"]) == "https") {
		return true;
	}
	if (isset($_SERVER["HTTP_FROM_HTTPS"]) && strtolower($_SERVER["HTTP_FROM_HTTPS"]) != "off") {
		return true;
	}
	if (isset($_SERVER["SERVER_PORT"]) && $_SERVER["SERVER_PORT"] == 443) {
		return true;
	}
	return false;
}

function download_as_file_with_auth($url, $username, $password, $targetfile)
{
	$out = fopen($targetfile, 'wb');
	if ($out === FALSE) {
		throw new Exception("无法创建文件 $targetfile , 请重新返回第一步，检查目录权限");
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FILE, $out);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	if ($username && $password) curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
	if (curl_exec($ch) === FALSE) {
		unlink($targetfile);
		throw new Exception("无法下载 $url, 错误信息：" . curl_error($ch));
	}
	$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if ($http_code === 403) {
		unlink($targetfile);
		throw new Exception("无法下载 $url, 认证信息错误，请返回上一步检查Secret ID/Key是否正确");
	}
	if ($http_code !== 200) {
		unlink($targetfile);
		throw new Exception("无法下载 $url, 错误代码：$http_code");
	}
	curl_close($ch);
	fclose($out);
}

function extract_zip($zipfile, $targetfolder)
{
	$zip = new ZipArchive;
	$res = $zip->open($zipfile);
	if ($res === true) {
        if ($zip->extractTo($targetfolder) === FALSE) {
            throw new Exception("无法解压缩 $zipfile 到 $targetfolder ，
             请检查 $targetfolder 下是否有文件或目录的拥有者用户与 $zipfile 拥有者用户不同，
             若有不同则修改该目录或文件拥有者保持与$zipfile 拥有者相同，操作完后再次点击重试");
        }
        $zip->close();
	} else {
		throw new Exception("无法打开 $zipfile");
	}
}

function try_mkdir($path, $mode = 0777, $recursive = false)
{
	if (file_exists($path)) return;
	mkdir($path, $mode, $recursive);
}

function remove_dir($path)
{
	if (empty($path) || !$path) {
		return false;
	}
	return is_file($path) ?
		@unlink($path) :
		array_map(__FUNCTION__, glob($path . '/*')) == @rmdir($path);
}

function writable_check($dir)
{
	$tmpfile = $dir . "/" . uniqid('test', true);
	if (file_put_contents($tmpfile, "hello") === FALSE) {
		return false;
	}
	if (!file_exists($tmpfile)) {
		return false;
	}
	return unlink($tmpfile);
}

function existing_installation()
{
	$dir = __DIR__;
	if (file_exists($dir . "/../config/config.php") || file_exists($dir . "/../storage/install.lock")) {
		return extract_version_from_source();
	}
	return false;
}

function extract_version_from_source()
{
	$dir = __DIR__;
	$appfile = $dir . "/../framework/src/Foundation/Application.php";
	if (!file_exists($appfile)) {
		$appfile = $dir . "/../vendor/discuz/core/src/Foundation/Application.php";
		if (!file_exists($appfile)) {
			return false;
		}
	}
	$content = file_get_contents($appfile);
	$match = NULL;
	preg_match("/const VERSION = '(.*)';$/m", $content, $match);
	if ($match) {
		return $match[1];
	}
	return false;
}

function get_server_url()
{
	$url = is_https() ? "https://" : "http://";
	$url .= $_SERVER['HTTP_HOST'];
	return $url;
}

function check_mysql_connection($host, $username, $password)
{
	$port = 3306;
	if (strpos($host, ":") !== FALSE) {
		list($host, $port) = explode(":", $host);
	}
	try {
		$conn = "mysql:host=$host;port=$port;charset=utf8mb4";
		return new PDO($conn, $username, $password);
	} catch (PDOException $e) {
		if ($e->getCode() === 2002) {
			return -1; // -1 表示连接被拒绝
		}
		if ($e->getCode() === 1045) {
			return -2; // -2 表示用户名/密码错误
		}
		return false;
	}
}

function check_mysql_version($host, $username, $password)
{
	$pdo = check_mysql_connection($host, $username, $password);
	if ($pdo === FALSE) {
		return "数据库无法连接";
	}
	if ($q = $pdo->query('SELECT VERSION()')) {
		$version = $q->fetchColumn();
		if (strpos($version, 'MariaDB') !== FALSE) {
			if (version_compare($version, '10.3.0', '>=')) {
				return true;
			}
		} else {
			if (version_compare($version, '8.0.0', '>=')) {
				return true;
			}
		}
	} else {
		return "无法查询数据库版本";
	}
	if ($q = $pdo->query("SELECT @@GLOBAL.innodb_default_row_format")) {
		$rowformat = $q->fetchColumn();
		if ($rowformat != "dynamic") {
			return "MySQL配置不正确，请确认innodb_default_row_format配置为dynamic";
		}
		$large_prefix = $pdo->query("SELECT @@GLOBAL.innodb_large_prefix")->fetchColumn();
		if ($large_prefix != 1) {
			return "MySQL配置不正确，请确认innodb_large_prefix配置为on";
		}
	} else {
		return "MySQL版本太低，请使用MySQL 5.7.9版本以上或MariaDB 10.2以上";
	}
	return true;
}

function check_mysql_database($host, $username, $password, $database)
{
	$database = addslashes($database);
	$pdo = check_mysql_connection($host, $username, $password);
	if ($pdo === FALSE) {
		return "数据库无法连接";
	}
	if ($pdo->exec("USE $database") !== FALSE) {
		if ($pdo->query("SHOW TABLES")->rowCount() > 0) {
			return "数据库 $database 不为空，请清空后重试";
		}
		return true;
	} else {
		if ($q = $pdo->query("SHOW DATABASES LIKE '$database'")) {
			if ($q->rowCount() > 0) {
				return "无法切换到数据库 $database";
			}
			if ($pdo->query("CREATE DATABASE $database DEFAULT CHARACTER SET = `utf8mb4` DEFAULT COLLATE = `utf8mb4_unicode_ci`") === FALSE) {
				return "无法创建数据库 $database ，请检查用户权限";
			}
			return true;
		}
		return "无法获取数据库列表";
	}
}

function build_steps()
{
	global $STEP;
	$image_ver = check_image();
	$steps = NULL;

	if ($image_ver === FALSE) {
		if (check_full_install_pack() && !existing_installation()) {
			$steps = array(
				0 => 'silent_self_update',
				1 => 'check_env_and_extension',
				2 => 'pre_check',
				3 => 'check_symlink',
				4 => 'check_httpd_config',
				5 => 'show_init_form',
			);
		} else {
			$steps = array(
				0 => 'silent_self_update',
				1 => 'check_env_and_extension',
				2 => 'pre_check',
				3 => 'download_package',
				4 => 'download_dzq_main',
				5 => 'download_vendor',
				6 => 'check_symlink',
				7 => 'check_httpd_config',
				8 => 'show_init_form',
			);
		}
	} else {
		$steps = array(
			0 => 'silent_self_update',
			1 => 'image_welcome',
			2 => 'download_package',
			3 => 'download_dzq_main',
			4 => 'download_vendor',
			5 => 'show_init_form'
		);
	}

	// 如果有数据库初始化脚本，由本程序进行初始化
	if (has_mysql_init_sql()) {
		$steps[max(array_keys($steps)) + 1] = 'init_dzq';
	}

	// 在第0步的时候，不进行跨目录访问
	if ($STEP > 0) {
		$current_install_ver = existing_installation();
		if ($current_install_ver) {
			// 如果已有安装，则只保留steps到download_vendor
			$index = array_search('download_vendor', $steps);
			$steps = array_slice($steps, 0, $index + 1);
			// 后面加一个升级的步骤
			$steps[$index + 1] = 'upgrade_existing_installation';
		}
	}

	return $steps;
}

function get_public_key()
{
	return <<< KEY
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyQIpYY9IvLo58LWeobje
TG5kWo9EBR95teBGQ+GWOcOoCkImjrXqanv+rrD3ul9N8EJBPXCYatvjUQ8GkVhW
RuC0gRnMe/QY3/Jj5X34SI/JTkGZzWNaBE9kHkDkDi9NKlF3QQKxaCncEJAJe/mw
K4XpN237nDoJdIrZ+yxh0sBKQKVx5dOY22prqfYqCVEvpdM5I5c+kWwHYVqPilSp
olaQcWbT5CNg+xRkE/KVi0eNNSFbOnfO4EeejMAg3SykA1Q88mhQUCzbDjXH3Aus
zelb28gHM4GhqQ0qOrPsTyB3J/2tM5Mf10pp1l+5t+AdRNOIIxpVpqeyP9vKNTGp
fdDonO5rwFAAtl/xyp13iA9nWa9RErwTcgfony25pT4EMHVXK+ZXnnX7SbiPptr0
KjG01fbcc7dq/wAc/Ig/5vkBbi+bN5fhHrhsDSbcYuDyqCRBQGm63kFEQxa5ELCL
XF4DEJjVZjt2Tja57USiF5azcA4y6WOG477zFq7isQ6utTOdwEk2T/rrU49f617R
SePPM/AR+J/QpCuuYlWrp4/Wvkvqp39/nM+Nz+mseBAGdLRERiWWOchGyomtbXT7
UDCP9hocnyQeVwv6PltATtdwjEclyMKMSP2dZHkNFewt4PAJW3eoxH4OzCaRKCUn
vp9sbj9wdQsoik/2mhaBm5UCAwEAAQ==
-----END PUBLIC KEY-----
KEY;
}

function save_current_version($file_name)
{
	$version = extract_version_from_source();
	if ($version) {
		file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . $file_name, $version);
	}
}

function save_current_ver_as_old_ver()
{
	save_current_version('.oldversion');
}

/**
 * 返回旧的版本号，用于升级时，代码覆盖完之后，执行后续的升级步骤
 * 因为此时代码已经覆盖为新的，所以已经无法从源代码中获取版本号
 * @return string
 */
function get_old_version()
{
	return file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . ".oldversion");
}

function auto_next_step()
{
	?>
	<script>
		setTimeout(function() {
			next_step();
		}, 1000);
	</script>
<?php
}

function get_version_from_versioned_zip($versioned_zip)
{
	if (preg_match("/qcloud-discuz-v(.*)-.*\.zip/m", $versioned_zip, $m)) {
		return $m[1];
	} else {
		throw new Exception("版本号格式错误");
	}
}

/**
 * 检查是否是完整安装包(无需下载主程序和vendor目录)
 * @return bool
 */
function check_full_install_pack()
{
	$parent_dir = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..');
	$file = $parent_dir . "/.dzq-full-install-pack";
	return file_exists($file);
}

function has_mysql_init_sql()
{
	$file = __DIR__ . DIRECTORY_SEPARATOR . '../database/init_mysql.sql';
	return file_exists($file);
}

//endregion