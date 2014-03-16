module Tenon
  class WarningGenerator
    def self.generate
      new.warnings
    end

    def warnings
      warnings = []
      warnings << "Your site needs a title<br /><a href='/tenon/settings'>OK</a><br />".html_safe if Tenon::MySettings.site_title.blank?
      warnings << "Your site needs an address<br /><a href='/tenon/settings'>OK</a><br />".html_safe if Tenon::MySettings.site_url.blank?
      warnings << "You haven't entered an email address to receive contact messages.<br /><a href='/tenon/settings'>Correct This</a><br />".html_safe  if Tenon::MySettings.contact_email.blank?
      warnings << "You haven't entered an email address from which to send contact messages and other site notices.<br /><a href='/tenon/settings'>Correct This</a><br />".html_safe  if Tenon::MySettings.from_email.blank?
      warnings << "You haven't entered the Google Analytics code.<br /><a href='/tenon/settings'>Correct This</a><br />".html_safe if Tenon::MySettings.google_analytics.blank?
      warnings << 'You have not included a custom favicon.' unless favicon && favicon.size > 0
      warnings
    end

    private

    def favicon
      return @favicon if @favicon
      begin
        @favicon = File.read(File.join(Rails.root, 'public', 'favicon.ico'))
      rescue Errno::ENOENT
        @favicon = nil
      end
    end
  end
end
