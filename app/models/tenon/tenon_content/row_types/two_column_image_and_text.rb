module Tenon
  module TenonContent
    module RowTypes
      class TwoColumnImageAndText < TenonContent::RowTypes::Base
        class << self
          def add_pieces_to(row)
            if row.pieces.empty?
              row.pieces.build(piece_type: 'Image', position: 0, size: 6)
              row.pieces.build(piece_type: 'Text', position: 1, size: 6)
              row.pieces.build(piece_type: 'Image', position: 2, size: 6)
              row.pieces.build(piece_type: 'Text', position: 3, size: 6)
            end
          end
        end
      end
    end
  end
end
