"""Peach backend message localization.

Maps internal Chinese error/status messages to target locales (e.g. Vietnamese, English)
based on Accept-Language header, cookie, or environment variable.
"""
from __future__ import annotations

import os
from typing import Any

TRANSLATIONS: dict[str, dict[str, str]] = {
    # General / HTTP errors
    "有几项需要修改": {"en": "Several items need changes", "vi": "Có một số mục cần chỉnh sửa"},
    "请输入访问密码": {"en": "Please enter an access password", "vi": "Vui lòng nhập mật khẩu truy cập"},
    "两次输入的密码不一致": {"en": "Passwords do not match", "vi": "Mật khẩu nhập lại không khớp"},
    "访问密码需为 8–256 个字符": {"en": "Access password must be 8–256 characters", "vi": "Mật khẩu truy cập phải từ 8–256 ký tự"},
    "当前访问密码不正确": {"en": "Current access password is incorrect", "vi": "Mật khẩu truy cập hiện tại không đúng"},
    "密码需要是文字": {"en": "Password must be text", "vi": "Mật khẩu phải là chuỗi văn bản"},
    "请选择设置或关闭密码": {"en": "Please choose to set or disable password", "vi": "Vui lòng chọn đặt hoặc tắt mật khẩu"},
    "关闭访问密码前先勾选确认": {"en": "Please check confirmation before disabling access password", "vi": "Vui lòng chọn xác nhận trước khi tắt mật khẩu truy cập"},
    "访问设置已变更，请刷新后再保存": {"en": "Access settings changed, please refresh and save again", "vi": "Cài đặt truy cập đã thay đổi, vui lòng tải lại trang rồi lưu lại"},
    "访问设置无法读取，请在本机检查配置文件": {"en": "Cannot read access settings, please check the configuration file on this machine", "vi": "Không thể đọc cài đặt truy cập, vui lòng kiểm tra tệp cấu hình trên máy"},
    "访问设置正在保存，请稍后重试": {"en": "Access settings are being saved, please try again later", "vi": "Đang lưu cài đặt truy cập, vui lòng thử lại sau"},
    "设置已变更，请刷新后再保存": {"en": "Settings changed, please refresh and save again", "vi": "Cài đặt đã thay đổi, vui lòng tải lại trang rồi lưu lại"},
    "配置已变更，请刷新后再保存": {"en": "Configuration changed, please refresh and save again", "vi": "Cấu hình đã thay đổi, vui lòng tải lại trang rồi lưu lại"},
    "设置正在保存，请稍后重试": {"en": "Settings are being saved, please try again later", "vi": "Đang lưu cài đặt, vui lòng thử lại sau"},
    "请先完成首次设置": {"en": "Please complete initial setup first", "vi": "Vui lòng hoàn tất thiết lập ban đầu trước"},
    "请先添加媒体目录": {"en": "Please add a media directory first", "vi": "Vui lòng thêm thư mục media trước"},
    "Peach 数据目录不能为空": {"en": "Peach data directory cannot be empty", "vi": "Thư mục dữ liệu Peach không được để trống"},
    "媒体目录不能为空": {"en": "Media directory cannot be empty", "vi": "Thư mục media không được để trống"},
    "填 1（只有这台电脑）或 2（同一局域网的设备）": {"en": "Enter 1 (this computer only) or 2 (devices on LAN)", "vi": "Chọn 1 (chỉ máy này) hoặc 2 (thiết bị cùng mạng LAN)"},
    "端口要是 1 到 65535 之间的整数": {"en": "Port must be an integer between 1 and 65535", "vi": "Cổng phải là số nguyên từ 1 đến 65535"},
    "这个端口已被占用，请换一个端口": {"en": "This port is already in use, please choose another port", "vi": "Cổng này đã được sử dụng, vui lòng chọn cổng khác"},
    "名字只能用字母、数字和连字符，不能以连字符开头或结尾": {"en": "Name can only contain letters, numbers, and hyphens, and cannot start or end with a hyphen", "vi": "Tên chỉ chứa chữ cái, số và dấu gạch nối, không được bắt đầu hoặc kết thúc bằng gạch nối"},
    "填 y 或 n": {"en": "Enter y or n", "vi": "Điền y hoặc n"},
    "无法使用此数据目录": {"en": "Cannot use this data directory", "vi": "Không thể dùng thư mục dữ liệu này"},
    "请求正文要是 JSON 对象": {"en": "Request body must be a JSON object", "vi": "Nội dung yêu cầu phải là đối tượng JSON"},
    "请选择已有数据目录的绝对路径": {"en": "Please select an absolute path to an existing data directory", "vi": "Vui lòng chọn đường dẫn tuyệt đối đến thư mục dữ liệu đã có"},
    "此目录中没有有效的 config.toml": {"en": "No valid config.toml found in this directory", "vi": "Không tìm thấy config.toml hợp lệ trong thư mục này"},
    "此目录中没有数据库，请选择保存原配置和数据库的数据目录": {"en": "No database found in this directory, please select a data directory with existing config and database", "vi": "Không tìm thấy cơ sở dữ liệu trong thư mục này, vui lòng chọn thư mục chứa cấu hình và dữ liệu cũ"},
    "请使用本机地址打开设置": {"en": "Please open settings using the local address", "vi": "Vui lòng dùng địa chỉ cục bộ để mở cài đặt"},
    "请从 Peach 设置页提交": {"en": "Please submit from the Peach settings page", "vi": "Vui lòng gửi từ trang cài đặt Peach"},
    "请从 Peach 配置页提交": {"en": "Please submit from the Peach configuration page", "vi": "Vui lòng gửi từ trang cấu hình Peach"},
    "请在运行 Peach 的电脑上打开配置": {"en": "Please open configuration on the computer running Peach", "vi": "Vui lòng mở cấu hình trên máy tính đang chạy Peach"},
    "请在运行 Peach 的电脑上打开系统诊断": {"en": "Please open diagnostics on the computer running Peach", "vi": "Vui lòng mở chẩn đoán hệ thống trên máy tính đang chạy Peach"},
    "正在卸载，Peach 将退出。完成后可关闭此页。": {"en": "Uninstalling, Peach will exit. You can close this page after completion.", "vi": "Đang gỡ cài đặt, Peach sẽ thoát. Có thể đóng trang này sau khi hoàn tất."},
    "这个系统上先退出 Peach，再手动移除程序与数据目录": {"en": "On this system, please exit Peach first, then manually remove the program and data directories.", "vi": "Trên hệ thống này, vui lòng thoát Peach trước, sau đó xóa thư mục chương trình và dữ liệu theo cách thủ công."},
    "更新任务尚未结束，请完成后卸载": {"en": "Update task has not finished yet, please uninstall after completion.", "vi": "Tác vụ cập nhật chưa hoàn tất, vui lòng gỡ cài đặt sau khi hoàn tất."},
    "请确认卸载 Peach": {"en": "Please confirm uninstalling Peach", "vi": "Vui lòng xác nhận gỡ cài đặt Peach"},
    "后台任务正在运行，请完成后卸载": {"en": "Background task is running, please uninstall after completion", "vi": "Tác vụ nền đang chạy, vui lòng gỡ cài đặt sau khi hoàn tất"},
    "已经有一个选择文件夹的窗口开着": {"en": "A folder picker window is already open", "vi": "Đã có một cửa sổ chọn thư mục đang mở"},
    "没能打开文件夹对话框": {"en": "Could not open folder dialog", "vi": "Không mở được hộp chọn thư mục"},
    "这个系统上没有可用的文件夹对话框": {"en": "There is no folder dialog available on this system", "vi": "Hệ thống này không có sẵn hộp thoại chọn thư mục"},
    "请选择有效的视频项目": {"en": "Please select valid video items", "vi": "Vui lòng chọn video hợp lệ"},
    "选择项目与失败重试不能同时使用": {"en": "Selecting items and retry cannot be used together", "vi": "Không thể chọn mục đồng thời với thử lại thất bại"},
    "原任务已变化，请刷新页面后重试": {"en": "Original task has changed, please refresh and try again", "vi": "Tác vụ gốc đã thay đổi, vui lòng làm mới trang rồi thử lại"},
    "重试项目格式无效": {"en": "Invalid retry item format", "vi": "Định dạng mục thử lại không hợp lệ"},
    "重试项目不属于原任务的失败集合": {"en": "Retry items do not belong to the failure set of the previous task", "vi": "Mục thử lại không thuộc danh sách thất bại của tác vụ trước"},
    "当前馆藏与媒体配置不一致": {"en": "Current library does not match media configuration", "vi": "Bộ sưu tập hiện tại không khớp với cấu hình media"},
    "处理阶段无效": {"en": "Invalid processing stage", "vi": "Giai đoạn xử lý không hợp lệ"},
    "视频预览生成已关闭，请先在媒体库设置中开启": {"en": "Video preview generation is disabled, please enable it in library settings first", "vi": "Tạo bản xem trước video đang tắt, vui lòng bật trong cài đặt thư viện trước"},
    "此部署通过配置文件管理服务": {"en": "This deployment manages services via configuration file", "vi": "Bản triển khai này quản lý dịch vụ qua tệp cấu hình"},
    "播放链接已失效，请在作品详情重新打开": {"en": "Playback link expired, please reopen from item details", "vi": "Liên kết phát đã hết hạn, vui lòng mở lại từ chi tiết tác phẩm"},
    "播放地址无效": {"en": "Invalid playback address", "vi": "Địa chỉ phát không hợp lệ"},
    "尝试次数较多，请一分钟后重试": {"en": "Too many attempts, please try again in a minute", "vi": "Thử quá nhiều lần, vui lòng thử lại sau 1 phút"},
    "这个地址下没有页面。": {"en": "Page not found.", "vi": "Không tìm thấy trang dưới địa chỉ này."},
    "这个地址不接受这种请求。": {"en": "Method not allowed.", "vi": "Địa chỉ này không chấp nhận yêu cầu này."},
    "数据目录": {"en": "Data directory", "vi": "Thư mục dữ liệu"},
    "媒体目录": {"en": "Media directory", "vi": "Thư mục media"},
    "谁可以访问": {"en": "Who can access", "vi": "Ai có thể truy cập"},
    "端口": {"en": "Port", "vi": "Cổng"},
    "局域网访问地址": {"en": "LAN access address", "vi": "Địa chỉ truy cập mạng LAN"},
    "只有这台电脑": {"en": "Only this computer", "vi": "Chỉ máy tính này"},
    "同一局域网的设备": {"en": "Devices on the same LAN", "vi": "Thiết bị trong cùng mạng LAN"},
    "本地硬盘 / NAS": {"en": "Local drive / NAS", "vi": "Ổ cứng cục bộ / NAS"},
    "挂载帮助": {"en": "Mount help", "vi": "Hướng dẫn gắn ổ"},
    "提交内容有误，请检查输入后重试。": {"en": "Invalid submission, please check input and retry.", "vi": "Nội dung gửi lên bị lỗi, vui lòng kiểm tra lại."},
    "登录已失效，请刷新页面重新登录。": {"en": "Session expired, please refresh to log in again.", "vi": "Phiên đăng nhập đã hết hạn, vui lòng làm mới trang để đăng nhập lại."},
    "当前设备没有执行此操作的权限，请在运行 Peach 的电脑上操作。": {"en": "This device does not have permission, please operate on the computer running Peach.", "vi": "Thiết bị hiện tại không có quyền, vui lòng thao tác trên máy tính đang chạy Peach."},
    "请求的内容已不存在，请刷新列表。": {"en": "Requested content no longer exists, please refresh list.", "vi": "Nội dung yêu cầu không còn tồn tại, vui lòng làm mới danh sách."},
    "请求超时，请稍后重试。": {"en": "Request timed out, please try again later.", "vi": "Yêu cầu quá thời gian, vui lòng thử lại sau."},
    "当前状态不允许此操作，请刷新后重试。": {"en": "Current state does not allow this action, please refresh and retry.", "vi": "Trạng thái hiện tại không cho phép thao tác này, vui lòng làm mới trang rồi thử lại."},
    "提交内容过大，请减少数量后重试。": {"en": "Submission too large, please reduce amount and retry.", "vi": "Nội dung gửi lên quá lớn, vui lòng giảm số lượng rồi thử lại."},
    "请求过于频繁，请稍后重试。": {"en": "Requests too frequent, please try again later.", "vi": "Yêu cầu quá thường xuyên, vui lòng thử lại sau."},
    "Peach 服务处理失败，请重试；持续失败时查看托盘日志。": {"en": "Peach service processing failed, please retry; check tray log if it persists.", "vi": "Dịch vụ Peach xử lý thất bại, vui lòng thử lại; nếu tiếp tục lỗi hãy xem nhật ký khay hệ thống."},
    "Peach 服务没有取回结果，请稍后重试；持续失败时查看托盘日志。": {"en": "Peach service returned no result, please retry; check tray log if it persists.", "vi": "Dịch vụ Peach chưa trả về kết quả, vui lòng thử lại; nếu tiếp tục lỗi hãy xem nhật ký khay hệ thống."},
    "Peach 服务暂时不可用，请稍后重试。": {"en": "Peach service temporarily unavailable, please try again later.", "vi": "Dịch vụ Peach tạm thời không khả dụng, vui lòng thử lại sau."},
    "等待服务响应超时，请稍后重试。": {"en": "Waiting for service response timed out, please try again later.", "vi": "Chờ phản hồi dịch vụ quá thời gian, vui lòng thử lại sau."},
    "无法连接到 Peach 服务，请确认网络连接和托盘服务已启动。": {"en": "Cannot connect to Peach service, please check network and tray service.", "vi": "Không thể kết nối đến dịch vụ Peach, vui lòng kiểm tra kết nối mạng và dịch vụ khay hệ thống."},
    "等待服务响应超时，请检查连接后重试。": {"en": "Waiting for service response timed out, please check connection and retry.", "vi": "Chờ phản hồi dịch vụ quá thời gian, vui lòng kiểm tra kết nối rồi thử lại."},
    "操作未完成，请重试；持续失败时查看托盘日志。": {"en": "Action not finished, please retry; check tray log if it persists.", "vi": "Thao tác chưa hoàn thành, vui lòng thử lại; nếu tiếp tục lỗi hãy xem nhật ký khay hệ thống."},
    "这个位置不归 Peach 管，只能自己打开": {"en": "This location is not managed by Peach, please open it manually", "vi": "Vị trí này không do Peach quản lý, vui lòng tự mở"},
    "这个位置已经不在了": {"en": "This location no longer exists", "vi": "Vị trí này không còn tồn tại"},
    "这台机器上打不开文件管理器": {"en": "Cannot open file manager on this system", "vi": "Không thể mở trình quản lý tệp trên hệ thống này"},
    "打开文件管理器失败，请重试": {"en": "Failed to open file manager, please try again", "vi": "Không thể mở trình quản lý tệp, vui lòng thử lại"},
    "导出文件超过 1 GB": {"en": "Export file exceeds 1 GB", "vi": "Tệp xuất vượt quá 1 GB"},
    "导出文件为空": {"en": "Export file is empty", "vi": "Tệp xuất rỗng"},
    "浏览器添加只在允许修改数据库的设备上可用": {"en": "Browser extension addition is only available on devices allowed to edit the database", "vi": "Tính năng thêm từ trình duyệt chỉ khả dụng trên thiết bị được phép ghi cơ sở dữ liệu"},
    "请在 Peach 下载渠道启用浏览器添加并配置专用令牌": {"en": "Please enable browser addition and configure a dedicated token in Peach download settings", "vi": "Vui lòng bật tính năng thêm từ trình duyệt và cấu hình token riêng trong cài đặt tải về của Peach"},
    "服务处理失败，请导出诊断报告": {"en": "Service error, please export diagnostics report", "vi": "Xử lý dịch vụ thất bại, vui lòng xuất báo cáo chẩn đoán"},
    "请选择是否删除 Peach 数据": {"en": "Please choose whether to delete Peach data", "vi": "Vui lòng chọn có xóa dữ liệu Peach hay không"},
    "源码安装请先退出托盘，再手动移除项目；数据目录见下方": {"en": "For source installs, exit the tray first, then remove the project manually; see data directory below", "vi": "Cài đặt từ mã nguồn vui lòng thoát khay hệ thống trước, sau đó xóa thư mục theo cách thủ công; xem thư mục dữ liệu bên dưới"},
    "程序目录不适合自动卸载": {"en": "Program directory is not suitable for automatic uninstall", "vi": "Thư mục chương trình không phù hợp để gỡ cài đặt tự động"},
    "程序与数据目录重叠，请手动卸载": {"en": "Program and data directories overlap, please uninstall manually", "vi": "Thư mục chương trình và dữ liệu trùng nhau, vui lòng gỡ cài đặt thủ công"},
    "数据使用了外部或嵌套目录，请保留数据卸载后按目录清单手动清理": {"en": "Data uses external or nested directories, please clean manually after uninstalling", "vi": "Dữ liệu dùng thư mục ngoài hoặc lồng nhau, vui lòng dọn dẹp thủ công theo danh sách sau khi gỡ cài đặt"},
    "卸载目录与媒体目录重叠，请手动检查": {"en": "Uninstall directory overlaps with media directory, please check manually", "vi": "Thư mục gỡ cài đặt trùng với thư mục media, vui lòng kiểm tra thủ công"},
    "源码安装请先关闭开机自启并退出托盘，再手动移除项目与数据目录": {"en": "For source installs, disable startup and exit tray first, then remove project and data directories manually", "vi": "Cài đặt từ mã nguồn vui lòng tắt khởi động cùng hệ thống và thoát khay hệ thống trước, sau đó xóa thư mục thủ công"},
    "配置已变更，请重新确认卸载": {"en": "Configuration changed, please confirm uninstall again", "vi": "Cấu hình đã thay đổi, vui lòng xác nhận gỡ cài đặt lại"},
    "错误记录过于频繁": {"en": "Error reporting too frequent", "vi": "Ghi nhận lỗi quá thường xuyên"},
    "错误记录过长": {"en": "Error record too long", "vi": "Nội dung ghi lỗi quá dài"},
    "错误记录格式无效": {"en": "Invalid error record format", "vi": "Định dạng ghi lỗi không hợp lệ"},
    "错误记录缺少原因": {"en": "Error record missing reason", "vi": "Bản ghi lỗi thiếu nguyên nhân"},
    "错误日志无法写入": {"en": "Cannot write error log", "vi": "Không thể ghi nhật ký lỗi"},
    "索引器配置读不出来": {"en": "Cannot read indexer configuration", "vi": "Không thể đọc cấu hình bộ lập chỉ mục"},
    "索引器配置没有保存，请检查本机凭据目录权限": {"en": "Indexer configuration not saved, please check credentials directory permissions", "vi": "Chưa lưu cấu hình bộ lập chỉ mục, vui lòng kiểm tra quyền thư mục thông tin đăng nhập trên máy"},
    "请选择有效的保持登录时间": {"en": "Please select a valid session duration", "vi": "Vui lòng chọn thời gian duy trì đăng nhập hợp lệ"},
    "enabled 必须是 true 或 false": {"en": "enabled must be true or false", "vi": "enabled phải là true hoặc false"},
    "订阅源拉取只在写入端可用": {"en": "Feed pulling is only available on writer nodes", "vi": "Lấy nguồn đăng ký chỉ khả dụng trên máy ghi"},
    "自动更新设置无法读取，请重新保存。": {"en": "Cannot read automatic update settings, please save again.", "vi": "Không thể đọc cài đặt tự động cập nhật, vui lòng lưu lại."},
    "自动更新需要由托盘管理的服务": {"en": "Automatic updates require tray-managed service", "vi": "Tự động cập nhật yêu cầu dịch vụ được quản lý bởi khay hệ thống"},
    "请选择自动更新方式": {"en": "Please choose automatic update method", "vi": "Vui lòng chọn phương thức tự động cập nhật"},
    "请选择检查频率": {"en": "Please choose check frequency", "vi": "Vui lòng chọn tần suất kiểm tra"},
    "自动下载仅适用于 Windows 独立测试包": {"en": "Automatic download only applies to Windows standalone package", "vi": "Tự động tải về chỉ áp dụng cho gói độc lập Windows"},
    "来源配置必须是对象": {"en": "Source configuration must be an object", "vi": "Cấu hình nguồn phải là một đối tượng"},
    "来源名称需要 1–80 个字符": {"en": "Source name must be 1–80 characters", "vi": "Tên nguồn phải từ 1–80 ký tự"},
    "接口地址需要包含一个 {code}": {"en": "Endpoint URL must contain {code}", "vi": "Địa chỉ API phải chứa {code}"},
    "接口需要使用固定公网域名的 HTTPS 地址，端口为 443": {"en": "Endpoint must use fixed public HTTPS domain on port 443", "vi": "API phải dùng địa chỉ HTTPS với tên miền công khai cố định, cổng 443"},
    "请填写响应中番号字段的路径": {"en": "Please specify path to code field in response", "vi": "Vui lòng điền đường dẫn trường mã số trong phản hồi"},
    "字段映射只接受对象键或数组下标组成的点路径": {"en": "Field mapping only accepts dot-paths of object keys or array indices", "vi": "Ánh xạ trường chỉ chấp nhận đường dẫn dấu chấm gồm khóa đối tượng hoặc chỉ số mảng"},
    "至少选择一种有效内容类型": {"en": "Please select at least one valid content type", "vi": "Chọn ít nhất một loại nội dung hợp lệ"},
    "启用状态必须为布尔值": {"en": "Enabled state must be boolean", "vi": "Trạng thái bật/tắt phải là giá trị boolean"},
    "请选择直连或 Peach 代理": {"en": "Please choose direct connection or Peach proxy", "vi": "Vui lòng chọn kết nối trực tiếp hoặc qua proxy Peach"},
    "番号格式无效": {"en": "Invalid code format", "vi": "Định dạng mã số không hợp lệ"},
    "自定义来源配置无效": {"en": "Invalid custom source configuration", "vi": "Cấu hình nguồn tùy chỉnh không hợp lệ"},
    "来源不存在，请刷新": {"en": "Source does not exist, please refresh", "vi": "Nguồn không tồn tại, vui lòng làm mới trang"},
    "请选择来源": {"en": "Please select a source", "vi": "Vui lòng chọn nguồn"},
    "来源返回的番号与查询番号不一致": {"en": "Source returned a code different from query", "vi": "Mã số nguồn trả về không khớp với mã số truy vấn"},
    "来源查询已超时": {"en": "Source query timed out", "vi": "Truy vấn nguồn đã quá thời gian"},
    "来源域名必须解析到公网地址": {"en": "Source domain must resolve to a public address", "vi": "Tên miền nguồn phải phân giải về địa chỉ công khai"},
    "来源连接失败": {"en": "Source connection failed", "vi": "Kết nối nguồn thất bại"},
    "Peach 代理配置未取得": {"en": "Peach proxy configuration unavailable", "vi": "Chưa lấy được cấu hình proxy Peach"},
    "来源响应不是有效 JSON": {"en": "Source response is not valid JSON", "vi": "Phản hồi nguồn không phải là JSON hợp lệ"},
    "桌面快捷方式属于另一份 Peach 安装": {"en": "Desktop shortcut belongs to another Peach installation", "vi": "Lối tắt màn hình thuộc về một bản cài đặt Peach khác"},
    "启动项属于另一份 Peach 安装": {"en": "Startup item belongs to another Peach installation", "vi": "Mục khởi động thuộc về một bản cài đặt Peach khác"},
    "桌面快捷方式状态未取得": {"en": "Desktop shortcut status unavailable", "vi": "Chưa lấy được trạng thái lối tắt màn hình"},
    "此系统未提供登录自启入口": {"en": "Auto-start on login not available on this system", "vi": "Hệ thống này không hỗ trợ tự khởi động khi đăng nhập"},
    "未找到本机托盘入口": {"en": "Native tray entry not found", "vi": "Không tìm thấy lối vào khay hệ thống cục bộ"},
    "启动项状态未取得": {"en": "Startup item status unavailable", "vi": "Chưa lấy được trạng thái mục khởi động"},
    "启动选项必须为开或关": {"en": "Startup option must be on or off", "vi": "Tùy chọn khởi động phải là bật hoặc tắt"},
    "请先在配置页添加媒体目录": {"en": "Please add a media directory in configuration first", "vi": "Vui lòng thêm thư mục media trong trang cấu hình trước"},
    "所选字段资料不在当前批次，无法批准": {"en": "Selected field data not in current batch, cannot approve", "vi": "Dữ liệu trường đã chọn không thuộc đợt hiện tại, không thể phê duyệt"},
    "只有待确认的资料字段可以批准": {"en": "Only pending metadata fields can be approved", "vi": "Chỉ các trường dữ liệu chờ xác nhận mới có thể phê duyệt"},
    "待确认资料的 JSON 格式无效": {"en": "Invalid JSON format for pending metadata", "vi": "Định dạng JSON của dữ liệu chờ xác nhận không hợp lệ"},
    "所选来源的资料不在当前待确认列表中": {"en": "Selected source data not in pending list", "vi": "Dữ liệu từ nguồn đã chọn không nằm trong danh sách chờ xác nhận"},
    "所选资料不在当前批次，无法批准": {"en": "Selected data not in current batch, cannot approve", "vi": "Dữ liệu đã chọn không thuộc đợt hiện tại, không thể phê duyệt"},
    "只有通过图片质量检查的备选图片可以使用": {"en": "Only alternative images passing quality checks can be used", "vi": "Chỉ ảnh dự phòng vượt qua kiểm tra chất lượng mới có thể sử dụng"},
    "所选图片缺少有效的 SHA-256 校验值": {"en": "Selected image lacks valid SHA-256 checksum", "vi": "Ảnh đã chọn thiếu giá trị kiểm tra SHA-256 hợp lệ"},
    "图片内容与待确认记录不一致，无法使用": {"en": "Image content does not match pending record, cannot use", "vi": "Nội dung ảnh không khớp với bản ghi chờ xác nhận, không thể sử dụng"},
    "所选资料中没有可用的本机图片，无法使用": {"en": "No usable local image in selected data, cannot use", "vi": "Dữ liệu đã chọn không có ảnh cục bộ khả dụng, không thể sử dụng"},
    "厂牌名无法生成存盘文件名": {"en": "Studio name cannot generate a valid filename", "vi": "Tên hãng không thể tạo thành tên tệp hợp lệ"},
    "批准资料字段时，请先选择要采用的来源": {"en": "Please select a source to adopt when approving fields", "vi": "Khi phê duyệt trường dữ liệu, vui lòng chọn nguồn cần áp dụng trước"},
    "只有 candidate 状态的复核项可以批准": {"en": "Only candidate review items can be approved", "vi": "Chỉ các mục xét duyệt ở trạng thái ứng viên mới có thể phê duyệt"},
    "提交内容与所选资料不一致，未保存": {"en": "Submission does not match selected data, not saved", "vi": "Nội dung gửi lên không khớp với dữ liệu đã chọn, chưa lưu"},
    "要收录的 genre 是空的": {"en": "Genre to include is empty", "vi": "Thể loại cần thu thập đang trống"},
    "标签名须为 1 到 80 个字符，且不能是出演者标记": {"en": "Tag name must be 1 to 80 characters and not performer mark", "vi": "Tên thẻ phải từ 1 đến 80 ký tự và không được là đánh dấu diễn viên"},
    "馆藏未找到这个番号": {"en": "Code not found in library", "vi": "Không tìm thấy mã số này trong bộ sưu tập"},
    "候选封面未通过检查。": {"en": "Candidate cover failed check.", "vi": "Bìa ứng viên không vượt qua kiểm tra."},
    "已有图片保留。": {"en": "Existing image retained.", "vi": "Giữ nguyên ảnh hiện có."},
    "来源正在冷却，请稍后重试。": {"en": "Source is cooling down, please try again later.", "vi": "Nguồn đang làm nguội, vui lòng thử lại sau."},
    "代理连接失败，请检查 Peach 代理。": {"en": "Proxy connection failed, please check Peach proxy.", "vi": "Kết nối proxy thất bại, vui lòng kiểm tra proxy Peach."},
    "来源连接超时，请稍后重试或检查连接方式。": {"en": "Source connection timed out, please retry or check connection.", "vi": "Kết nối nguồn quá thời gian, vui lòng thử lại hoặc kiểm tra kết nối."},
    "未知采集来源": {"en": "Unknown scraping source", "vi": "Nguồn thu thập không xác định"},
    "片商官网按番号选择，请输入馆藏番号检查高清封面。": {"en": "Studio site selected by code, please enter code to check HD cover.", "vi": "Trang web của hãng chọn theo mã số, vui lòng nhập mã số trong bộ sưu tập để kiểm tra bìa HD."},
    "没有要写入的设置": {"en": "No settings to write", "vi": "Không có cài đặt nào để lưu"},
    "口味分析已更新": {"en": "Taste analysis updated", "vi": "Phân tích sở thích đã cập nhật"},
    "部分浏览记录未取得": {"en": "Some browsing history could not be obtained", "vi": "Chưa lấy được một phần lịch sử duyệt"},
    "正在查找 Peach 主机上的浏览器资料": {"en": "Searching for browser data on Peach host", "vi": "Đang tìm kiếm dữ liệu trình duyệt trên máy chủ Peach"},
    "正在汇总口味分布、标签与创作者排名": {"en": "Aggregating taste distribution, tags, and creator rankings", "vi": "Đang tổng hợp phân bổ sở thích, thẻ và bảng xếp hạng người sáng tạo"},
    "before_finished_at 与 before_id 要一起给": {"en": "before_finished_at and before_id must be provided together", "vi": "before_finished_at và before_id phải được cung cấp cùng nhau"},
    "before_id 必须是正整数": {"en": "before_id must be a positive integer", "vi": "before_id phải là số nguyên dương"},
    "采集密度无效": {"en": "Invalid sampling density", "vi": "Mật độ lấy mẫu không hợp lệ"},
    "未找到 ffmpeg，无法采集缩略图": {"en": "ffmpeg not found, cannot capture thumbnails", "vi": "Không tìm thấy ffmpeg, không thể chụp ảnh thu nhỏ"},
    "缺少想要条目编号": {"en": "Missing want item ID", "vi": "Thiếu mã mục mong muốn"},
    "未支持的发行方": {"en": "Unsupported publisher", "vi": "Nhà phát hành chưa được hỗ trợ"},
    "艺人身份已变化，请重新预览": {"en": "Artist identity changed, please preview again", "vi": "Danh tính nghệ sĩ đã thay đổi, vui lòng xem trước lại"},
}


def request_language(request: Any = None) -> str:
    """Determine client language preference from cookie, Accept-Language, or environment."""
    if request is not None:
        try:
            cookie = (request.cookies.get("peach.locale") or request.cookies.get("locale") or "").lower()
            if cookie.startswith("vi"):
                return "vi"
            if cookie.startswith("en"):
                return "en"
            if cookie.startswith("zh"):
                return "zh"
        except Exception:
            pass
        try:
            accept = (request.headers.get("accept-language") or "").lower()
            if "vi" in accept:
                return "vi"
            if "en" in accept:
                return "en"
            if "zh" in accept:
                return "zh"
        except Exception:
            pass

    env = os.environ.get("PEACH_LOCALE", "").strip().lower()
    if env.startswith("vi"):
        return "vi"
    if env.startswith("en"):
        return "en"
    if env.startswith("zh"):
        return "zh"

    # Default to Chinese for test stability when no header/env is set
    return "zh"


def localize_string(message: str, lang: str) -> str:
    """Translate a message to the target language if known, otherwise return unchanged."""
    if not message or lang == "zh":
        return message
    entry = TRANSLATIONS.get(message)
    if entry:
        return entry.get(lang) or entry.get("en") or message
    return message


def localize_value(val: Any, lang: str) -> Any:
    """Recursively localize string values within dictionaries or lists."""
    if lang == "zh":
        return val
    if isinstance(val, str):
        return localize_string(val, lang)
    if isinstance(val, dict):
        return {k: localize_value(v, lang) for k, v in val.items()}
    if isinstance(val, list):
        return [localize_value(item, lang) for item in val]
    return val
